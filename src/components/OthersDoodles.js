import React, { useState, useEffect } from "react";
import DoodleList from "./DoodleList";
import { firestore } from "../firebase";
import { useHistory } from "react-router-dom";

function OthersDoodles({ setSelectedDoodle, user }) {
  const [doodles, setDoodles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        firestore
          .collection("doodles")
          .where("uid", "!=", user.uid)
          .get()
          .then((querySnapshot) => {
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
  }, [user.uid]);

  function handleSelectOthers(doodle) {
    setSelectedDoodle(doodle);
    history.push(`doodles/${doodle.id}`);
  }
  return (
    <>
      <h1>Others' Doodles</h1>
      <DoodleList doodles={doodles} handleSelect={handleSelectOthers} />
    </>
  );
}

export default OthersDoodles;
