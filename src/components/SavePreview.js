import React, { useState } from "react"; //, { useEffect, useState }
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box, Button, ButtonGroup } from "@mui/material";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

// import PropTypes from 'prop-types'

function SavePreview({ currentDoodle, setCurrentDoodle, handleSave }) {
  const [titleInput, setTitleInput] = useState(
    currentDoodle.title || "Name Your Doodle Here"
  );

  function handleCommentSubmit(commentBody) {
    const comment = { time: Date.now(), username: "jones5", body: commentBody };
    const commentedDoodle = {
      ...currentDoodle,
      comments: [...currentDoodle.comments, comment],
    };
    setCurrentDoodle(commentedDoodle);
    handleSave(commentedDoodle);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.target.elements[0].blur();
        }}
      >
        <h1>
          <input
            onChange={(e) => setTitleInput(e.target.value)}
            onClick={() => {
              if (titleInput === "Your Doodle") setTitleInput("");
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
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={handleSave}>Save</Button>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button>Continue Doodling</Button>
        </Link>
      </ButtonGroup>
      {currentDoodle.id ? (
        <CommentSection
          handleCommentSubmit={handleCommentSubmit}
          comments={currentDoodle.comments}
        />
      ) : null}
    </>
  );
}

export default SavePreview;
