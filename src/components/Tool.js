import React from "react";
import PropTypes from "prop-types";
//need name of toolset, current object
export default function Tool(props) {
  function handleSubmit(e) {
    e.preventDefault();

    const updatedTool = {
      ...props.tool,
      value:e.target[props.tool.name].value
    }
    props.handleToolEdit(updatedTool)
  }
  
  return (
    <>
      <h3>{props.tool.name}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name={props.tool.name}
          min={props.tool.min}
          max={props.tool.max}
          placeholder={props.tool.value}
        />
      </form>
    </>
  );
}
Tool.propTypes = {
  tool: PropTypes.object,
  handleToolEdit: PropTypes.func,
};
