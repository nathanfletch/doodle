import React from "react";
import PropTypes from "prop-types";

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
      <input
        onChange={handleChange}
        type="number"
        name={props.tool.name}
        min={props.tool.min}
        max={props.tool.max}
        value={props.tool.value}
      />
    </li>
  );
}
Tool.propTypes = {
  tool: PropTypes.object,
  handleToolEdit: PropTypes.func,
};
