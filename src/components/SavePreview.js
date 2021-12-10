import React, { useState } from "react"; //, { useEffect, useState }
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box, Button } from "@mui/material";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

function SavePreview({ currentDoodle, setCurrentDoodle, handleSave }) {
  const [titleInput, setTitleInput] = useState(
    currentDoodle.title || "Name Your Doodle Here"
  );
  return (
    <>
      {/* <h1>Title</h1> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.target.blur();
        }}
      >
        <h1>
          <input
            onChange={(e) => setTitleInput(e.target.value)}
            onClick={() => {
              if (titleInput === "Name Your Doodle Here") setTitleInput("");
            }}
            onBlur={() =>
              setCurrentDoodle({ ...currentDoodle, title: titleInput })
            }
            value={titleInput}
            style={{
              width: "100%",
              textAlign: "center",
              display: "block",
              fontSize: "1.4em",
              fontWeight: "bold",
              fontFamily: "inherit",
              border: "none",
              backgroundColor: "transparent",
              color: "inherit",
              marginBlockStart: "0.67em",
              marginBlockEnd: "0.67em",
              marginInlineStart: "0px",
              marginInlineEnd: "0px",
            }}
          />
        </h1>
      </form>
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
