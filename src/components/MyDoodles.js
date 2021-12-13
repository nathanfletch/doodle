import React, { useEffect, useState } from "react";
import DoodleList from "./DoodleList";
import { firestore } from "../firebase";
import { useHistory, useParams } from "react-router-dom";

function MyDoodles({ setCurrentDoodle, user }) {
  const [doodles, setDoodles] = useState([]);
  const history = useHistory();
  const id = useParams();
  console.log(id);

  function handleSelectMine(doodle) {
    setCurrentDoodle(doodle);
    history.push(`/doodles/${doodle.id}/edit`);
  }

  useEffect(() => {
    console.log("fetching");
    const fetchData = async () => {
      try {
        firestore
          .collection("doodles")
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              setDoodles((prevDoodles) => [...prevDoodles, doc.data()]);
            });
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

  return (
    <>
      <h1>My Doodles</h1>
      <DoodleList doodles={doodles} handleSelect={handleSelectMine} />
    </>
  );
}

export default MyDoodles;
