import DoodlePage from "./DoodlePage";
import AccountPage from "./AccountPage";
import DoodleDetail from "./DoodleDetail";
import MyDoodles from "./MyDoodles";
import OthersDoodles from "./OthersDoodles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocalStorageState } from "../custom-hooks";
import React from "react";

function App() {
  const [currentDoodle, setCurrentDoodle] = useLocalStorageState(
    "currentDoodle",
    ""
  );

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <DoodlePage
              currentDoodle={currentDoodle}
              setCurrentDoodle={setCurrentDoodle}
            />
          </Route>
          <Route exact path="/account">
            <AccountPage />
          </Route>
          <Route exact path="/detail">
            <DoodleDetail currentDoodle={currentDoodle} />
          </Route>
          <Route exact path="/mydoodles">
            <MyDoodles />
          </Route>
          <Route exact path="/othersdoodles">
            <OthersDoodles />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
