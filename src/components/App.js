import DoodlePage from "./DoodlePage";
import AccountPage from "./AccountPage";
import DoodleDetails from "./DoodleDetails";
import MyDoodles from "./MyDoodles";
import OthersDoodles from "./OthersDoodles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocalStorageState } from "../custom-hooks";
import React from "react";
import { sampleComments } from "../sample-comments";
import firestore from "../firebase";

function App() {
  const [currentDoodle, setCurrentDoodle] = useLocalStorageState(
    "currentDoodle",
    ""
  );
  const [fakeDb, setFakeDb] = useLocalStorageState("fakeDb", "");
  const handleSave = () => {
    const newDoc = firestore.collection("doodle").doc();
    const doodleInfo = {
      user: "Jones4",
      title: "MyDoodle",
      dataUrl: currentDoodle,
      time: Date.now(),
      id: newDoc.id,
      // aspectRatio,
      comments: sampleComments,
      // emojis: [
      //   time: {
      //     user,
      //     emoji,
      //   }
      // ]
    };
    setFakeDb((prevDb) => [...prevDb, doodleInfo]);

    newDoc.set(doodleInfo);

    console.log(newDoc);
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
            <AccountPage />
          </Route>
          <Route exact path="/details">
            <DoodleDetails currentDoodle={currentDoodle} />
          </Route>
          <Route exact path="/mydoodles">
            <MyDoodles fakeDb={fakeDb} />
          </Route>
          <Route exact path="/browse">
            <OthersDoodles fakeDb={fakeDb} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
