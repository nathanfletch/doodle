import React, { useEffect, useState } from "react";
import DoodleList from "./DoodleList";
import firestore from "../firebase";
// import PropTypes from 'prop-types'

function MyDoodles({ handleSelect }) {
  const [doodles, setDoodles] = useState([]);
  useEffect(() => {
    console.log("fetching");
    const fetchData = async () => {
      try {
        firestore
          .collection("doodles")
          .where("user", "==", "Jones4")
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
  }, []);

  return (
    <>
      <h1>My Doodles</h1>
      <DoodleList doodles={doodles} handleSelect={handleSelect} />
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
