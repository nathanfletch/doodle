import React, { useState, useEffect } from "react";
import DoodleList from "./DoodleList";
import { firestore } from "../firebase";
import { useHistory } from "react-router-dom";

// import PropTypes from 'prop-types'

function OthersDoodles({ setSelectedDoodle }) {
  const [doodles, setDoodles] = useState([]);
  const history = useHistory();

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

  function handleSelectOthers(doodle) {
    setSelectedDoodle(doodle);
    history.push(`details/${doodle.id}`);
  }
  return (
    <>
      <h1>Others' Doodles</h1>
      <DoodleList doodles={doodles} handleSelect={handleSelectOthers} />
    </>
  );
}

// OthersDoodles.propTypes = {

// }

export default OthersDoodles;
