import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Link as MuiLink, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { firebase } from "../firebase";
import "firebase/compat/auth";
import { Link } from "react-router-dom";

// import PropTypes from 'prop-types'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {"Copyright © "}
      <MuiLink
        color="inherit"
        href="https://github.com/nathanfletch"
        target="blank"
      >
        Nathan Fletcher
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//replace this with signed in test
function AccountPage({ user, setUser, setCurrentDoodle }) {
  const [mode, setMode] = useState("signin");

  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        setCurrentDoodle({});
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  return user ? (
    <div>
      You are signed in!
      <Link to={"/"}>
        <Button>Continue doodling</Button>
      </Link>
      <Button onClick={logOut}>Logout</Button>
    </div>
  ) : (
    <>
      {
        /* use a nested route instead of this?*/ mode === "signup" ? (
          <SignUp setMode={setMode} setUser={setUser} />
        ) : (
          <SignIn setMode={setMode} setUser={setUser} />
        )
      }
      <Copyright />
    </>
  );
}

// AccountPage.propTypes = {

// }

export default AccountPage;
