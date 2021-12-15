import React, { useEffect, useState } from "react"; //
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box } from "@mui/material";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import EmojiBar from "./EmojiBar";

function DoodleDetails({
  handleSave,
  selectedDoodle,
  setSelectedDoodle,
  handleUpdate,
  user,
}) {
  const [displayDoodle, setDisplayDoodle] = useState(selectedDoodle || null);
  let { id } = useParams();

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

  function handleCommentSubmit(commentBody) {
    const comment = {
      time: Date.now(),
      uid: user.uid,
      username: user.username,
      body: commentBody, //update
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

  function handleCommentDelete(time) {
    const commentIndex = displayDoodle.comments.findIndex(
      (comment) => comment.time === time
    );
    const commentRemovedCommentsCopy = [...displayDoodle.comments];
    commentRemovedCommentsCopy.splice(commentIndex, 1);
    const commentRemovedDoodle = {
      ...displayDoodle,
      comments: commentRemovedCommentsCopy,
    };

    setSelectedDoodle(commentRemovedDoodle);
    setDisplayDoodle(commentRemovedDoodle);
    handleUpdate(commentRemovedDoodle);
  }

  // const emojiPicker = ['fire', 'sparkles', '']
  // const emojiList = displayDoodle.emojis.length
  //   ? displayDoodle.emojis.map((emoji, i) => <span key={i}>{emoji.emoji}</span>)
  //   : null;
  //love, smile, thumb,

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
      <EmojiBar user={user} />
      <CommentSection
        comments={displayDoodle.comments}
        doodleUid={displayDoodle.uid}
        handleCommentSubmit={handleCommentSubmit}
        handleCommentDelete={handleCommentDelete}
        user={user}
      />
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default DoodleDetails;
