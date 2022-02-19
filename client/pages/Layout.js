import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./Main";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  },
}));

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Route path="/add" exact>
          <Typography>Позже здесь будет форма для добавления фраз</Typography>
        </Route>
        <Redirect to="/main" />
      </Switch>
    </div>
  );
}

export default Layout;
