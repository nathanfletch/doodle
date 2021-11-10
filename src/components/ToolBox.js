import React from "react";
import Tool from "./Tool";
import PropTypes from "prop-types";

export default function ToolBox(props) {
  console.log(props.toolSet);
  return (
    <li className="sidebar-section">
      <h3>{props.toolSet[0].type}</h3>
      <ul className="sidebar-list">

      {props.toolSet.map((t, i) => (
        <Tool handleToolEdit={props.handleToolEdit} tool={t} key={t.id}/>
      ))}
      </ul>
    </li>
  );
}

ToolBox.propTypes = {
  tools: PropTypes.array,
};
