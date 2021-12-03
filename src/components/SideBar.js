import React from "react";
import ToolBox from "./ToolBox";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

export default function SideBar({
  handleToolEdit,
  handleToolReset,
  handleClear,
  tools,
}) {
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
        <Button variant="outlined" onClick={handleToolReset}>
          Reset Tools
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear Doodle
        </Button>
        <Button variant="outlined" onClick={handleSave}>
          Save Doodle
        </Button>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  tools: PropTypes.array,
  handleToolEdit: PropTypes.func,
  handleToolReset: PropTypes.func,
  handleClear: PropTypes.func,
};
