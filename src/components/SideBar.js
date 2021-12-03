import React from "react";
import ToolBox from "./ToolBox";
import PropTypes from "prop-types";

export default function SideBar(props) {

  const handleSave = () => {
    
  }

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <ToolBox
          handleToolEdit={props.handleToolEdit}
          toolSet={props.tools.filter((t) => t.type === "Rotation")}
        />
        <ToolBox
          handleToolEdit={props.handleToolEdit}
          toolSet={props.tools.filter((t) => t.type === "Color")}
        />
        <ToolBox
          handleToolEdit={props.handleToolEdit}
          toolSet={props.tools.filter((t) => t.type === "Line")}
        />
        <button onClick={handleSave} >Save Doodle</button>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  name: PropTypes.object,
  handleToolEdit: PropTypes.func,
};
