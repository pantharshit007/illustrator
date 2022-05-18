import {Component} from 'react';
import './Node.css'
export default class Node extends Component{
    render(){
        const {
            col,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            onKeyDown,
            onKeyUp,
            row,
            isWeighted,
            isVisited
        }= this.props
        const extraClassName = isFinish? 'node-f':isStart? 'node-start':isWall ? 'wall':isWeighted? 'node-weight':isVisited?'instantvisited':"";
        return (
            <div 
            id = {`node-${row}-${col}`}
            tabIndex ={0}
            className = {`node ${extraClassName}`}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseUp = {()=>onMouseUp()}
            onKeyDown ={(e)=>onKeyDown(e)}
            onKeyUp ={(e)=>onKeyUp(e)}></div>
        );
    }
}