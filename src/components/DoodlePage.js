import { React, useState } from "react";
import DoodleCanvas from "./DoodleCanvas";
import SideBar from "./SideBar";
import { defaultTools } from "../default-tools";

export default function DoodlePage() {
  //refactor to fn w hooks - done
  //get custom hook
  //add local state
  //add reset to default button on sidebar

  // const [sideBarShowing, setSideBarShowing] = useState(true);
  const [tools, setTools] = useState(defaultTools);

  // const handleClick = () => {
  //   setSideBarShowing((prevSideBarShowing) => !prevSideBarShowing);
  // };

  const handleToolEdit = (updatedTool) => {
    let toolsCopy = [...tools];
    toolsCopy[updatedTool.id] = updatedTool;
    setTools(toolsCopy);
  };

  // convert tool array to a simple key-value object easy for doodlecanvas to use.
  const toolsObject = {};
  tools.forEach((tool) => {
    toolsObject[tool.name.toLowerCase()] = tool.value;
  });

  return (
    <>
      <DoodleCanvas tools={toolsObject} />
      {/* <button onClick={this.handleClick}>{this.state.sideBarShowing ? "Hide Toolbar" : "Show Toolbar"}</button> */}
      <div id="sidebar-container">
        <SideBar handleToolEdit={handleToolEdit} tools={tools} />
      </div>
    </>
  );
}
