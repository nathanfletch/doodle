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
  user,
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
        <Link style={{ textDecoration: "none" }} to="/account">
          <Button
            sx={{ width: "120px", margin: "auto" }}
            size="small"
            variant="outlined"
          >
            Sign In
          </Button>
        </Link>
        {user ? (
          <>
            <Link style={{ textDecoration: "none" }} to="/doodles/new">
              <Button
                sx={{ width: "120px", margin: "auto" }}
                size="small"
                variant="outlined"
              >
                Save
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/doodles">
              <Button
                sx={{ width: "120px", margin: "auto" }}
                size="small"
                variant="outlined"
              >
                Doodles
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`/doodles/users/${user.username}`}
            >
              <Button
                sx={{ width: "120px", margin: "auto" }}
                size="small"
                variant="outlined"
              >
                My Doodles
              </Button>
            </Link>
          </>
        ) : null}
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
