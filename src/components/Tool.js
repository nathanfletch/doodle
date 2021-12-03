import React from "react";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";

export default function Tool(props) {
  function handleChange(e) {
    e.preventDefault();
    const updatedTool = {
      ...props.tool,
      value: e.target.value,
    };
    props.handleToolEdit(updatedTool);
  }

  return (
    <li className="sidebar-item">
      <label htmlFor={props.tool.name}>{props.tool.name}</label>
      <Slider
        marks={props.tool.type === "Line"}
        size="small"
        onChange={handleChange}
        type="number"
        name={props.tool.name}
        min={props.tool.min}
        max={props.tool.max}
        value={props.tool.value}
        sx={{
          color:
            props.tool.name === "Hue"
              ? `hsla(${props.tool.value}, 75%, 50%, 100%)`
              : "primary",
        }}
      />
    </li>
  );
}
Tool.propTypes = {
  tool: PropTypes.object,
  handleToolEdit: PropTypes.func,
};
