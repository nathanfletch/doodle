import React from "react";
import DoodleList from "./DoodleList";
// import PropTypes from 'prop-types'

function MyDoodles({ fakeDb }) {
  return (
    <>
      <h1>My Doodles</h1>
      <DoodleList fakeDb={fakeDb} />
    </>
  );
}
/* todos:
add button links to sidebar - details, view my doodles, signup, others' doodles
emoji picker
save doodles to a file to simulate db
  save button click handler
  
*/
// MyDoodles.propTypes = {

// }

export default MyDoodles;
