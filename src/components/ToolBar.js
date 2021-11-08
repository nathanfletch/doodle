import React from "react";
import ToolBox from "./ToolBox";
import PropTypes from "prop-types";

export default function ToolBar(props) {
  
  return (
    <>
      <ToolBox handleToolEdit={props.handleToolEdit} toolSet={props.tools.filter(t => t.type === 'Rotation')} />
      <ToolBox handleToolEdit={props.handleToolEdit} toolSet={props.tools.filter(t => t.type === 'Color')} />
      <ToolBox handleToolEdit={props.handleToolEdit} toolSet={props.tools.filter(t => t.type === 'Line')} />
    </>
  );
}

ToolBar.propTypes = {
  name: PropTypes.object,
  handleToolEdit: PropTypes.func,
};
