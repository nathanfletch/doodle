import React, { useEffect, useState } from "react"; //
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box, Button } from "@mui/material";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";
import firestore from "../firebase";

// import PropTypes from 'prop-types'

//handle this differently depending if it's your own doodle or anothers
function DoodleDetails({ currentDoodle, selectedDoodle }) {
  console.log(`has ${currentDoodle ? "current" : "no current"}`);
  const [displayDoodle, setDisplayDoodle] = useState(
    selectedDoodle || { ...currentDoodle, title: "Your New Doodle" }
  );
  useEffect(() => {
    console.log(displayDoodle);
  }, [displayDoodle]);

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

  return (
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
      <CommentSection />
    </>
  );
}

// DoodleDetail.propTypes = {

// }

export default DoodleDetails;
