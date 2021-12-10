import React from "react"; //, { useEffect, useState }
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box, Button } from "@mui/material";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

function SavePreview({ currentDoodle, setCurrentDoodle, handleSave }) {
  return (
    <>
      <h1>{currentDoodle.title || "Name Your Doodle Here"}</h1>
      <Box sx={{ width: "500px", margin: "auto" }}>
        <img
          src={currentDoodle.dataUrl}
          alt="Doodle"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Button
        sx={{ width: "120px", margin: "auto" }}
        size="small"
        variant="outlined"
        onClick={handleSave}
      >
        Save
      </Button>
      <Link style={{ textDecoration: "none" }} to="/">
        <Button
          sx={{ width: "120px", margin: "auto" }}
          size="small"
          variant="outlined"
        >
          Continue Doodling
        </Button>
      </Link>
      <CommentSection />
    </>
  );
}

export default SavePreview;
