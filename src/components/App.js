import React, { useState, useEffect } from "react";
import DoodlePage from "./DoodlePage";
import AccountPage from "./AccountPage";
import DoodleDetails from "./DoodleDetails";
import MyDoodles from "./MyDoodles";
import OthersDoodles from "./OthersDoodles";
import SavePreview from "./SavePreview";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocalStorageState } from "../custom-hooks";
import { sampleComments } from "../sample-comments";
import { firestore } from "../firebase";
// import { useHistory } from "react-router-dom";

function App() {
  const [currentDoodle, setCurrentDoodle] = useLocalStorageState(
    "currentDoodle",
    {}
  );
  const [fakeDb, setFakeDb] = useLocalStorageState("fakeDb", "");
  const [selectedDoodle, setSelectedDoodle] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //
    if (user) {
      console.log(user.uid);
      console.log(user.username);
    } else console.log("no user");
  }, [user]);

  const handleUpdate = (doodle) => {
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
        username: user.username || "Anonymous User",
        uid: user.uid || "Anonymous User Id",
        // dataUrl: currentDoodle,
        time: Date.now(),
        id: newDoc.id,
        // aspectRatio,
        comments: sampleComments,
        // emojis: [
        //   {
        //     user: "Jones3",
        //     emoji: ":smile:"
        //   }
        // ]
      };
      newDoc.set(doodleInfo);
      setCurrentDoodle(doodleInfo);
      //eventually stop doing this once they make an account - on account creation, delete key from local storage and add the username to doodles in the db
      setFakeDb((prevDb) => [...prevDb, doodleInfo]);
    }
  };

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <DoodlePage
              currentDoodle={currentDoodle}
              setCurrentDoodle={setCurrentDoodle}
              handleSave={handleSave}
            />
          </Route>
          <Route exact path="/account">
            <AccountPage user={user} setUser={setUser} />
          </Route>
          <Route exact path="/details/:id">
            <DoodleDetails
              currentDoodle={currentDoodle}
              selectedDoodle={selectedDoodle}
              setSelectedDoodle={setSelectedDoodle}
              handleUpdate={handleUpdate}
            />
          </Route>
          <Route exact path="/save">
            <SavePreview
              currentDoodle={currentDoodle}
              setCurrentDoodle={setCurrentDoodle}
              handleSave={handleSave}
            />
          </Route>
          <Route exact path="/mydoodles">
            <MyDoodles setCurrentDoodle={setCurrentDoodle} fakeDb={fakeDb} />
          </Route>
          <Route exact path="/browse">
            <OthersDoodles setSelectedDoodle={setSelectedDoodle} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
//app -> my -> commentSection
