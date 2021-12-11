import React, { useEffect, useState } from "react"; //
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box } from "@mui/material";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";

// import PropTypes from 'prop-types'

function DoodleDetails({
  handleSave,
  selectedDoodle,
  setSelectedDoodle,
  handleUpdate,
}) {
  const [displayDoodle, setDisplayDoodle] = useState(selectedDoodle || null);
  let { id } = useParams();

  // useEffect(() => {
  //   console.log(displayDoodle)
  // })
  useEffect(() => {
    if (selectedDoodle) return;

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
              // doc.data() will be undefined in this case
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
    const comment = { time: Date.now(), username: "jones5", body: commentBody };
    const commentedDoodle = {
      ...displayDoodle,
      comments: [...displayDoodle.comments, comment],
    };
    //this is bad:
    setSelectedDoodle(commentedDoodle);
    setDisplayDoodle(commentedDoodle);
    handleUpdate(commentedDoodle);
  }

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
      {/* <Button
          sx={{ width: "120px", margin: "auto" }}
          size="small"
          variant="outlined"
          onClick={handleSave}
        >
          Save
        </Button> */}
      <CommentSection
        comments={displayDoodle.comments}
        handleCommentSubmit={handleCommentSubmit}
      />
    </>
  ) : (
    <div>Loading...</div>
  );
}

// DoodleDetail.propTypes = {

// }

export default DoodleDetails;
