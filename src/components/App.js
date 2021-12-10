import React, { useState } from "react";
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
import firestore from "../firebase";
// import { useHistory } from "react-router-dom";

function App() {
  const [currentDoodle, setCurrentDoodle] = useLocalStorageState(
    "currentDoodle",
    {}
  );
  const [fakeDb, setFakeDb] = useLocalStorageState("fakeDb", "");
  const [selectedDoodle, setSelectedDoodle] = useState(null);

  const handleSave = () => {
    //update if has an id, create if doesn't - first update what currentDoodle is
    //2 cases: save a new doodle from canvas
    //save or update from details
    //what to do with old one?
    //completely separate details from a SavePreview/edit component with editable title - a lot of work.

    // if()
    const newDoc = firestore.collection("doodles").doc();
    const doodleInfo = {
      title: "MyDoodle",
      ...currentDoodle,
      user: "Jones4",
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
    setFakeDb((prevDb) => [...prevDb, doodleInfo]);

    newDoc.set(doodleInfo);

    console.log(newDoc);
  };
  function handleSelect(selectedDoodle) {
    console.log(`navigating to ${selectedDoodle.id} details`);
    setSelectedDoodle(selectedDoodle);
    // history.push("/details");
  }

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
            <AccountPage />
          </Route>
          <Route exact path="/details/:id">
            <DoodleDetails
              currentDoodle={currentDoodle}
              selectedDoodle={selectedDoodle}
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
            <MyDoodles handleSelect={handleSelect} fakeDb={fakeDb} />
          </Route>
          <Route exact path="/browse">
            <OthersDoodles handleSelect={handleSelect} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
