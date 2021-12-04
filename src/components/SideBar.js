import React from "react";
import ToolBox from "./ToolBox";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SideBar({
  handleToolEdit,
  handleToolReset,
  handleClear,
  tools,
  handleSave,
}) {
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
        <Button
          sx={{ width: "120px", margin: "auto" }}
          size="small"
          variant="outlined"
          onClick={handleToolReset}
        >
          Defaults
        </Button>
        <Button
          sx={{ width: "120px", margin: "auto" }}
          size="small"
          variant="outlined"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          sx={{ width: "120px", margin: "auto" }}
          size="small"
          variant="outlined"
          onClick={handleSave}
        >
          Save
        </Button>
        <Link style={{ textDecoration: "none" }} to="/account">
          <Button
            sx={{ width: "120px", margin: "auto" }}
            size="small"
            variant="outlined"
          >
            Sign Up
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/details">
          <Button
            sx={{ width: "120px", margin: "auto" }}
            size="small"
            variant="outlined"
          >
            Details
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/browse">
          <Button
            sx={{ width: "120px", margin: "auto" }}
            size="small"
            variant="outlined"
          >
            Browse
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/mydoodles">
          <Button
            sx={{ width: "120px", margin: "auto" }}
            size="small"
            variant="outlined"
          >
            MyDoodles
          </Button>
        </Link>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  tools: PropTypes.array,
  handleToolEdit: PropTypes.func,
  handleToolReset: PropTypes.func,
  handleClear: PropTypes.func,
  handleSave: PropTypes.func,
};
