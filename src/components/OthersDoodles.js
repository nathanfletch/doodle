import React from "react";
import DoodleList from "./DoodleList";

// import PropTypes from 'prop-types'

function OthersDoodles({ fakeDb }) {
  return (
    <>
      <h1>Others' Doodles</h1>
      <DoodleList fakeDb={fakeDb} />
    </>
  );
}

// OthersDoodles.propTypes = {

// }

export default OthersDoodles;
