import React,{Component} from 'react';
import { bsf } from '../algorithms/bsf';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { recursiveDivisionMaze } from '../algorithms/simplemaze';
import Navbar from './navbar';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

let START_NODE_ROW=10;
let START_NODE_COL=10;
let FINISH_NODE_ROW=40;
let FINISH_NODE_COL=10;
export default class PathfindingVisualizer extends Component{
    constructor (props){
        super(props);
        this.state ={
            grid:[],
            mouseIsPressed:false,
            keyIsPressed:false,
            pressedNodeStaus:"normal",
            prevPressedNode:null,
            

        };
    }
   componentDidMount(){
    const grid = getInitialGrid();
    this.setState({grid});
   }
   handleKeyDown(event){
       if(event.key==='w' && !this.state.keyIsPressed){
        this.setState({keyIsPressed: true})
       }
       
   }
   handleKeyUp(event){
    if(event.key==='w'){ 
        this.setState({keyIsPressed: false})
       }
       
   }
   handleMouseEnter(row,col){

       if(!this.state.mouseIsPressed)
       return;
       const node=getNode(this.state.grid,row,col);
       if(this.pressedNodeStaus==="normal"){
    if(this.state.keyIsPressed){
     this.setState({grid:getNewGridWithWeight(this.state.grid,row,col)}); return;}
        this.setState({grid:getNewGridWithWallToggled(this.state.grid,row,col)});}
        
     else{
         if(!node.isWall){
         console.log(this.pressedNodeStaus)
        this.setState({grid:getNewGridWithChangedSpecialNode(this.state.grid,row,col,this.pressedNodeStaus)})
        // changeToSpecial(node,this.pressedNodeStaus)
        changeToNormal(this.prevPressedNode,this.pressedNodeStaus)
        // console.log(this.prevPressedNode)
        this.prevPressedNode=node;}
     }
    //    console.dir(document.querySelector(`#node-${row}-${col}`));
   }         
   handleMouseDown(row,col){
       this.setState({mouseIsPressed:true})
       const node=getNode(this.state.grid,row,col);
       this.pressedNodeStaus= node.isStart?"start":node.isFinish?"finish":"normal";
       this.prevPressedNode=node;
       if(this.pressedNodeStaus==="normal"){
        if(this.state.keyIsPressed){
         this.setState({grid:getNewGridWithWeight(this.state.grid,row,col)}); return;}
       this.setState({grid:getNewGridWithWallToggled(this.state.grid,row,col)});}
       else{
           if(!node.isWall){
           changeToNormal(node,this.pressedNodeStaus);
           console.log(node)}
       }
  }
   handleMouseUp(){
    this.setState({mouseIsPressed:false})
}
    onKeyPressed(e) {
    console.log(e.key);
  }

  clearBoard(){
      const newGrid = reset();
      this.setState({grid:newGrid})
  }
   animateDijkstra(visitedNodesInOrder,shortestPathInOrder){
       for (let i =0;i<=visitedNodesInOrder.length;i++){
           if(i===visitedNodesInOrder.length){
               setTimeout(()=>{
                   this.animateShortestPath(shortestPathInOrder);
                },10*i);
                   return
           }
        
           changClassOfNode(visitedNodesInOrder[i],'node node-visited',10*i);
        //    setTimeout(()=>{
        //        const node = visitedNodesInOrder[i]
        //        document.querySelector(`#node-${node.row}-${node.col}`).className='node node-visited';
        //    },10*i)
       }

   }
   animateShortestPath(shortestPathInOrder){
       for (let i =0;i<shortestPathInOrder.length;i++){
           changClassOfNode(shortestPathInOrder[i],'node node-shortest-path',50*i);
        //    setTimeout(()=>{
        //        const node = shortestPathInOrder[i]
        //        document.querySelector(`#node-${node.row}-${node.col}`).className="node node-short"
        //    },50*i)
       }
   }
   visualizeBsf(){
    const {grid}=this.state
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = bsf(grid,startNode,finishNode);
    const shortestPathInOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder,shortestPathInOrder)
   }
   visualizeDijkstra(){
       const {grid}=this.state
       const startNode = grid[START_NODE_ROW][START_NODE_COL]
       const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
       const visitedNodesInOrder = dijkstra(grid,startNode,finishNode);
       const sortestPathInOrder = getNodesInShortestPathOrder(finishNode);
       console.log(visitedNodesInOrder)
        console.log(sortestPathInOrder)
       this.animateDijkstra(visitedNodesInOrder,sortestPathInOrder)
   }
   visualizeAlgroithm(){
       const currentAlgo= document.querySelector("#algoSection");
       if(currentAlgo.value ==="bsf"){
           console.log("pranshu  ")
           this.visualizeBsf();
       }
       else if (currentAlgo.value ==='dijkistra'){
           console.log("arst")
           this.visualizeDijkstra();
       }
   }
   visualizeWall()
   {
    const newGrid= this.state.grid.slice();
    newGrid.wallToAnimate=[];
    recursiveDivisionMaze(
        newGrid,
        2,
        newGrid.length,
        2,
        newGrid[0].length,
        "vertical",
        false,
        "wall"
      );
    //   this.setState({grid:newGrid})
    this.animateWall(newGrid.wallToAnimate)
   }
   animateWall(wallToAnimate){
       for (let i =0;i<wallToAnimate.length;i++){
    changClassOfWall(wallToAnimate[i],'node wall',10*i);}
   }

   render(){
       const {grid,mouseIsPressed}=this.state;
       return (
           <div >
               <Navbar onClick ={()=>this.visualizeAlgroithm()}
                        clearBoard = {()=>this.clearBoard()}
                        randomize={()=>this.visualizeWall()}
               ></Navbar>
           <div className = "grid">
           {grid.map((row,rowIdx)=>{
               return (
                   <div key = {rowIdx}
                   className={"row"}
                   >
                       {row.map((node,nodeIdx)=>{
                           const {row,col,isFinish,isStart,isWall,isWeighted}=node;
                           return(
                                <Node 
                                key ={nodeIdx}
                                col={col}
                                isFinish={isFinish}
                                isStart={isStart}
                                isWall={isWall}
                                mouseIsPressed={mouseIsPressed}
                                isWeighted={isWeighted}
                                // handle mouse press event
                                onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                                onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                onMouseUp={()=>this.handleMouseUp()}
                                onKeyDown ={(e)=>this.handleKeyDown(e)}
                                onKeyUp={(e)=>this.handleKeyUp(e)}
                                row={row}></Node>
                           );
                       })}
                   </div>
               );
           })}
           </div>
           </div>
       )
   }

    
  

}

const getNewGridWithChangedSpecialNode=(grid,row,col,staus)=>{
    const newGrid=grid.slice()
    const node=newGrid[row][col]
    const newNode=node;
    changeToSpecial(node,staus);
    newGrid[row][col]=newNode;
    return newGrid;
}
const changeToSpecial=(node,status)=>{
    if(status==='start'){
        node.isStart=true;
    START_NODE_ROW=node.row;
    START_NODE_COL=node.col;
    }

    else if(status === 'finish'){
        node.isFinish=true;
        FINISH_NODE_ROW=node.row;
        FINISH_NODE_COL=node.col;
    }
}
const changeToNormal=(node,status)=>{
    if(status==='start'){
        node.isStart=false;
    }
    else if(status === 'finish'){
        node.isFinish=false;
    }
    // document.querySelector(`#node-${node.row}-${node.col}`).className=
}
const getNode=(grid,row,col)=>{
    const node=grid[row][col];
    return node;
}
const getInitialGrid =()=>{
    const grid =[];
    for(let row =0;row<50;row++){
        const currentRow=[];
        for (let col =0;col<20;col++){
            currentRow.push(createNode(col,row));
        }
        grid.push(currentRow)
    }
    return grid;
}
const createNode =(col,row)=>{
    return{
        col,
        row,
        isStart: row===START_NODE_ROW && col===START_NODE_COL,
        isFinish :row===FINISH_NODE_ROW && col===FINISH_NODE_COL,
        distance :Infinity,
        isVisited:false,
        isWall :false,
        previousNode: null,
        isWeighted: false,
    };
};
const getNewGridWithWallToggled=(grid,row,col)=>{
    const newGrid =grid.slice();
    const node =newGrid[row][col];
    const newNode={
        ...node,
        isWall:!node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;

}
function changClassOfWall(node,changeClass,delay){
    setTimeout(()=>{
        if(!node.isStart && !node.isFinish){
        node.isWall=true;
        document.querySelector(`#node-${node.row}-${node.col}`).className = changeClass}
    },delay)
}
function changClassOfNode(node,changeClass,delay){
    setTimeout(()=>{
        if(!node.isStart && !node.isFinish)
        document.querySelector(`#node-${node.row}-${node.col}`).className = changeClass
    },delay)
}
function getNewGridWithWeight(grid,row,col){
    const newGrid=grid.slice();
    const node=newGrid[row][col];
    const newNode={
        ...node,
        isWeighted:!node.isWeighted,
    };
    newGrid[row][col]=newNode;
    return newGrid;
}
function reset(){
    const newGrid = getInitialGrid();
    for(let i of newGrid){
        for(let node of i){
            if(!node.isStart && !node.isFinish){
                document.querySelector(`#node-${node.row}-${node.col}`).className = "node"
            }
        }
    }
    return newGrid;
}

// const h = document.querySelector("select")
// if(h.value==="bsf"){
//     const visualBtn=document.querySelector("visual")
//     visualBtn.innerHTML
// }
