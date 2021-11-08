import React, { Component } from 'react'
import DoodleCanvas from "./DoodleCanvas";
import ToolBar from "./ToolBar";


export default class DoodlePage extends Component {
  constructor() {
    super();
    this.state = {
      toolBarShowing: true,
      
      tools: [
        {
          name: "Radius",
          type: "Rotation",
          value: 20,
          min: 1,
          max: 50,
          id: 0
        },
        {
          name: "Speed",
          type: "Rotation",
          value: 10,
          min: 1,
          max: 20,
          id: 1
        },
        {
          name: "Hue",
          type: "Color",
          value: 10,
          min: 0,
          max: 359,
          id: 2
        },
        {
          name: "Saturation",
          type: "Color",
          value: 50,
          min: 0,
          max: 100,
          id: 3
        },
        {
          name: "Lightness",
          type: "Color",
          value: 50,
          min: 0,
          max: 100,
          id: 4
        },
        {
          name: "Opacity",
          type: "Color",
          value: 100,
          min: 0,
          max: 100,
          id: 5
        },
        {
          name: "Number",
          type: "Line",
          value: 5,
          min: 1,
          max: 10,
          id: 6
        },
        {
          name: "Width",
          type: "Line",
          value: 3,
          min: 1,
          max: 10,
          id: 7
        }
      ]
    }
  }
  
  handleClick = () => {
    this.setState(prevState => ({toolBarShowing : !prevState.toolBarShowing}));
  }

  handleToolEdit = (updatedTool) => {
    let tools = [...this.state.tools];
    tools[updatedTool.id] = updatedTool;
    this.setState({
      tools
    });
  }
  render() {
    const toolObject = {};
    this.state.tools.forEach(tool => {
      toolObject[tool.name] = tool.value
    });
    console.log(toolObject)
    return (
      <React.Fragment>
        <DoodleCanvas tools={toolObject}/>
        <button onClick={this.handleClick}>{this.state.toolBarShowing ? "Hide Toolbar" : "Show Toolbar"}</button>
        {this.state.toolBarShowing ? <ToolBar handleToolEdit={this.handleToolEdit} tools={this.state.tools} /> : null}
      </React.Fragment>
    )
  }
}