import { React } from "react";
import DoodleCanvas from "./DoodleCanvas";
import SideBar from "./SideBar";
import { defaultTools } from "../default-tools";
import { useLocalStorageState } from "../custom-hooks";

export default function DoodlePage({ currentDoodle, setCurrentDoodle, handleSave }) {
  // const [sideBarShowing, setSideBarShowing] = useState(true);
  const [tools, setTools] = useLocalStorageState("tools", defaultTools);

  // const handleClick = () => {
  //   setSideBarShowing((prevSideBarShowing) => !prevSideBarShowing);
  // };

  const handleToolReset = () => {
    setTools(defaultTools);
  };

  const handleClear = () => {
    setCurrentDoodle({dataUrl: ""});
    //forcing a refresh: (without this it didn't clear the doodle - maybe because setting and reading local storage took too long)
    window.location.reload();
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
      <DoodleCanvas
        tools={toolsObject}
        setCurrentDoodle={setCurrentDoodle}
        currentDoodle={currentDoodle}
      />
      {/* <button onClick={this.handleClick}>{this.state.sideBarShowing ? "Hide Toolbar" : "Show Toolbar"}</button> */}
      <div id="sidebar-container">
        <SideBar
          handleToolEdit={handleToolEdit}
          handleToolReset={handleToolReset}
          handleClear={handleClear}
          handleSave={handleSave}
          tools={tools}
          
        />
      </div>
    </>
  );
}
