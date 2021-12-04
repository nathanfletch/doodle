import React from "react";
import Tool from "./Tool";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export default function ToolBox(props) {
  return (
    <li className="sidebar-section">
      <Box sx={{ margin: "1px" }}>
        <h3>{props.toolSet[0].type}</h3>
        <ul className="sidebar-list">
          {props.toolSet.map((t, i) => (
            <Tool handleToolEdit={props.handleToolEdit} tool={t} key={t.id} />
          ))}
        </ul>
      </Box>
    </li>
  );
}

ToolBox.propTypes = {
  tools: PropTypes.array,
};
