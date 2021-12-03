import React from "react";
import ToolBox from "./ToolBox";
import PropTypes from "prop-types";

export default function SideBar({ handleToolEdit, handleToolReset, tools }) {
  const handleSave = () => {};

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <ToolBox
          handleToolEdit={handleToolEdit}
          toolSet={tools.filter((t) => t.type === "Rotation")}
        />
        <ToolBox
          handleToolEdit={handleToolEdit}
          toolSet={tools.filter((t) => t.type === "Color")}
        />
        <ToolBox
          handleToolEdit={handleToolEdit}
          toolSet={tools.filter((t) => t.type === "Line")}
        />
        <button onClick={handleToolReset}>Reset to Defaults</button>
        <button onClick={handleSave}>Save Doodle</button>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  tools: PropTypes.array,
  handleToolEdit: PropTypes.func,
  handleToolReset: PropTypes.func,
};
