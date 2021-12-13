import { React } from "react";
import DoodleCanvas from "./DoodleCanvas";
import SideBar from "./SideBar";
import { defaultTools } from "../default-tools";
import { useLocalStorageState } from "../custom-hooks";

export default function DoodlePage({
  currentDoodle,
  setCurrentDoodle,
  handleSave,
  user,
}) {
  const [tools, setTools] = useLocalStorageState("tools", defaultTools);

  const handleToolReset = () => {
    setTools(defaultTools);
  };

  const handleClear = () => {
    setCurrentDoodle({});
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
      <div id="sidebar-container">
        <SideBar
          handleToolEdit={handleToolEdit}
          handleToolReset={handleToolReset}
          handleClear={handleClear}
          handleSave={handleSave}
          tools={tools}
          user={user}
        />
      </div>
    </>
  );
}
