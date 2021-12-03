import { React } from "react"; //, useState
import DoodleCanvas from "./DoodleCanvas";
import SideBar from "./SideBar";
import { defaultTools } from "../default-tools";
import { useLocalStorageState } from "../custom-hooks";

export default function DoodlePage() {
  // const [sideBarShowing, setSideBarShowing] = useState(true);
  const [tools, setTools] = useLocalStorageState("tools", defaultTools);

  // const handleClick = () => {
  //   setSideBarShowing((prevSideBarShowing) => !prevSideBarShowing);
  // };

  const handleToolReset = () => {
    setTools(defaultTools);
  };

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
        <SideBar
          handleToolEdit={handleToolEdit}
          handleToolReset={handleToolReset}
          tools={tools}
        />
      </div>
    </>
  );
}
