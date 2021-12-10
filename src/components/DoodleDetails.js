import React from "react"; //{useEffect}
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box } from "@mui/material";
import CommentSection from "./CommentSection";
// import { useParams } from 'react-router-dom';

// import PropTypes from 'prop-types'

function DoodleDetails({ currentDoodle, selectedDoodle }) {
  console.log("current: " + typeof currentDoodle);
  console.log("current: " + typeof selectedDoodle);
  // let { id } = useParams();
  // useEffect(() => {
  //   if(currentDoodle.id === selectedDoodle.id) return;

  //   console.log("fetching");

  //   const fetchData = async () => {
  //     try {
  //       firestore
  //         .collection("doodles").doc(selectedDoodle.id)
  //         .get()
  //         .then((querySnapshot) => {
  //           console.log(querySnapshot);
  //           querySnapshot.forEach((doc) => {
  //             setDoodles((prevDoodles) => [...prevDoodles, doc.data()]);
  //           });
  //         })
  //         .catch((error) => {
  //           console.log("Error getting documents: ", error);
  //         });

  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, [])

  return (
    <>
      <h1>{selectedDoodle ? selectedDoodle.title : "Super Doodle"}</h1>
      <Box sx={{ width: "500px", margin: "auto" }}>
        <img
          src={selectedDoodle ? selectedDoodle.dataUrl : currentDoodle}
          alt="Doodle"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <CommentSection />
    </>
  );
}

// DoodleDetail.propTypes = {

// }

export default DoodleDetails;
