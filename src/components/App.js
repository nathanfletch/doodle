import React, { useState, useEffect } from "react";
import DoodlePage from "./DoodlePage";
import AccountPage from "./AccountPage";
import DoodleDetails from "./DoodleDetails";
import MyDoodles from "./MyDoodles";
import OthersDoodles from "./OthersDoodles";
import SavePreview from "./SavePreview";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useLocalStorageState } from "../custom-hooks";
import { sampleComments } from "../sample-comments";
import { firebase, firestore } from "../firebase";
// import { useHistory } from "react-router-dom";

function App() {
  const [currentDoodle, setCurrentDoodle] = useLocalStorageState(
    "currentDoodle",
    {}
  );
  const [selectedDoodle, setSelectedDoodle] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userStatus) => {
      if (userStatus) {
        console.log("user data from firebase: ");
        const fetchedUser = {
          uid: userStatus.uid,
          username: userStatus.displayName,
        };
        console.log(fetchedUser);
        setUser(fetchedUser);
      } else {
        console.log("user isn't signed in on firebase");
        setUser(null);
      }
    });
  }, []);

  const handleUpdate = (doodle) => {
    console.log(doodle);
    console.log(`updating ${doodle.title}, id ${doodle.id}`);
    firestore.collection("doodles").doc(doodle.id).update(doodle);
  };

  const handleSave = () => {
    if (currentDoodle.id) {
      handleUpdate(currentDoodle);
    } else {
      const newDoc = firestore.collection("doodles").doc();
      const doodleInfo = {
        title: "MyDoodle",
        ...currentDoodle,
        username: user.username,
        uid: user.uid,
        time: Date.now(),
        id: newDoc.id,
        // aspectRatio,
        comments: sampleComments,
        emojis: [],
      };
      newDoc.set(doodleInfo);
      setCurrentDoodle(doodleInfo);
      //eventually stop doing this once they make an account - on account creation, delete key from local storage and add the username to doodles in the db
      // setFakeDb((prevDb) => [...prevDb, doodleInfo]);
    }
  };

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path={["/home", "/"]}>
            <DoodlePage
              currentDoodle={currentDoodle}
              setCurrentDoodle={setCurrentDoodle}
              handleSave={handleSave}
              user={user}
            />
          </Route>
          <Route exact path="/account">
            <AccountPage
              user={user}
              setUser={setUser}
              setCurrentDoodle={setCurrentDoodle}
            />
          </Route>
          {!user ? (
            <Redirect to={"/account"} />
          ) : (
            <Switch>
              <Route exact path="/doodles/users/:id">
                <MyDoodles user={user} setCurrentDoodle={setCurrentDoodle} />
              </Route>
              <Route exact path="/doodles">
                <OthersDoodles
                  user={user}
                  setSelectedDoodle={setSelectedDoodle}
                />
              </Route>
              <Switch>
                <Route exact path={["/doodles/new", "/doodles/:id/edit"]}>
                  <SavePreview
                    currentDoodle={currentDoodle}
                    setCurrentDoodle={setCurrentDoodle}
                    handleSave={handleSave}
                    handleUpdate={handleUpdate}
                    user={user}
                  />
                </Route>
                <Route exact path="/doodles/:id">
                  <DoodleDetails
                    currentDoodle={currentDoodle}
                    selectedDoodle={selectedDoodle}
                    setSelectedDoodle={setSelectedDoodle}
                    handleUpdate={handleUpdate}
                    user={user}
                  />
                </Route>
              </Switch>

              {/* <Route exact path="/doodles/:username"> - extend this to view another user's doodles?
                <OthersDoodles
                  user={user}
                  setSelectedDoodle={setSelectedDoodle}
                />
              </Route> */}
            </Switch>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
