import React, { useState, useEffect } from "react";
import DoodleList from "./DoodleList";
import firestore from "../firebase";

// import PropTypes from 'prop-types'

function OthersDoodles({ handleSelect }) {
  const [doodles, setDoodles] = useState([]);
  useEffect(() => {
    console.log("fetching");
    const fetchData = async () => {
      try {
        firestore
          .collection("doodles")
          .where("user", "!=", "Jones4")
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            let dbDoodles = [];
            querySnapshot.forEach((doc) => {
              dbDoodles.push(doc.data());
            });
            setDoodles(dbDoodles);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Others' Doodles</h1>
      <DoodleList doodles={doodles} handleSelect={handleSelect} />
    </>
  );
}

// OthersDoodles.propTypes = {

// }

export default OthersDoodles;
