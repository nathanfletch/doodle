import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
// import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// import PropTypes from 'prop-types'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/nathanfletch"
        target="blank"
      >
        Nathan Fletcher
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function AccountPage(props) {
  const [mode, setMode] = useState("signup");
  return (
    <>
      {mode === "signup" ? (
        <SignUp setMode={setMode} />
      ) : (
        <SignIn setMode={setMode} />
      )}
      <Copyright sx={{ mt: 5 }} />
    </>
  );
}

// AccountPage.propTypes = {

// }

export default AccountPage;
