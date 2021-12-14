import React, { useEffect, useState } from "react"; //
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box, Grid } from "@mui/material";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import Picker from "emoji-picker-react";
import AddReactionIcon from "@mui/icons-material/AddReaction";

function DoodleDetails({
  handleSave,
  selectedDoodle,
  setSelectedDoodle,
  handleUpdate,
  user,
}) {
  const [displayDoodle, setDisplayDoodle] = useState(selectedDoodle || null);
  let { id } = useParams();
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (selectedDoodle || id === "new") return;

    console.log("fetching");
    const fetchData = async () => {
      try {
        firestore
          .collection("doodles")
          .doc(id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setDisplayDoodle(doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, selectedDoodle]);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    // setChosenEmoji(emojiObject);
    console.log(displayDoodle);
    const emojiDoodle = {
      ...displayDoodle,
      emojis: [...displayDoodle.emojis, emojiObject],
    };
    // //to be refactored to only have one source of truth:
    // setSelectedDoodle(emojiDoodle);
    setDisplayDoodle(emojiDoodle);
    // handleUpdate(emojiDoodle);
  };

  function handleCommentSubmit(commentBody) {
    const comment = {
      time: Date.now(),
      uid: user.uid,
      username: user.username,
      body: commentBody,
    };
    const commentedDoodle = {
      ...displayDoodle,
      comments: [...displayDoodle.comments, comment],
    };
    //to be refactored to only have one source of truth:
    setSelectedDoodle(commentedDoodle);
    setDisplayDoodle(commentedDoodle);
    handleUpdate(commentedDoodle);
  }

  const emojiList = displayDoodle.emojis.length
    ? displayDoodle.emojis.map((emoji, i) => <span key={i}>{emoji.emoji}</span>)
    : null;

  return displayDoodle ? (
    <>
      <h1>{displayDoodle.title}</h1>
      <Box sx={{ width: "500px", margin: "auto" }}>
        <img
          src={displayDoodle.dataUrl}
          alt="Doodle"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Grid>
        {emojiList}
        <AddReactionIcon onClick={() => setShowPicker(!showPicker)} />
        {showPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
      </Grid>
      <CommentSection
        comments={displayDoodle.comments}
        handleCommentSubmit={handleCommentSubmit}
      />
    </>
  ) : (
    <div>Loading...</div>
  );
}
//id === "new" ? null :
export default DoodleDetails;
