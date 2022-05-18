import { Component } from "react";
import './navbar.css'
export default class Navbar extends Component{
    render(){
        const {
            onClick,
            clearBoard,
            randomize,
        }=this.props

    return(
      <div class="navbarDiv">
        <nav className="navbar navbar-inverse">
          <div class="navbar-header">   
          <div className="navbar-brand">
          <strong>Pathfinding Visualizer</strong></div></div>
          <div class="container">
          <div class ="nav navbar-nav bar">
            <li id="startButtonAddObject">
            <select id="algoSection" class ="select btn btn-default navbar-btn btnn">
            <option  selected disabled hidden>Pick An Algorithm</option>
            <option value="bsf">Breadth First Search</option>
            <option value="dijkistra">Dijkistra</option>
            </select></li>
          <li id="startButtonAddObject">
          <button class="btn btn-default navbar-btn visual" onClick={() => onClick()}>Visualize Algorithm</button></li>
          <li ><button class="btn btn-default navbar-btn btnn"onClick={() => randomize()}>Randomize Board</button></li>
          <li ><button class="btn btn-default navbar-btn btnn"onClick={() => clearBoard()}>Clear Board</button></li>
          
          </div></div></nav>
          <div id='mainGrid'>
        
          <div id='mainText'>
            <ul>
              <li>
                <div class="start"></div>Start Node</li>
              <li>
                <div class="target"></div>Target Node</li>
              <li id="bombLegend">
                <div class="object"></div>Bomb Node</li>
              <li id="weightLegend">
                <div class="borderlessWeight"></div>Weight Node</li>
              <li>
                <div class="unvisited"></div>Unvisited Node</li>
              <li>
                <div class="visited"></div><div class="visitedobject"></div>Visited Nodes</li>
              <li>
                <div class="shortest-path"></div>Shortest-path Node</li>
              <li>
                <div class="wall"></div>Wall Node</li>
            </ul>
          </div>
          <div id="#algorithmDescriptor ">Pick an algorithm and visualize it!</div>
        </div>
        </div>
    );
}
}