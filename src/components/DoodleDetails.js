import React from "react"; //{ useRef, useLayoutEffect }
// import Image from "material-ui-image"; - need aspect ratio to use this! maybe I can create a doodle data object and get it from that
import { Box } from "@mui/material";
import CommentSection from "./CommentSection";

// import PropTypes from 'prop-types'

function DoodleDetails({ currentDoodle }) {
  // let imageRef = useRef(null)
  // useLayoutEffect(() => {
  //   imageRef.current

  // }, [input])
  // image.src = currentDoodle;
  // useEffect(() => {
  // }, [image, currentDoodle]);
  return (
    <>
      <h1>Doodle Name Here</h1>
      <Box sx={{ width: "500px", margin: "auto" }}>
        <img
          src={currentDoodle}
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
