import { makeStyles } from "@material-ui/core";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AddForm from "./AddFrom";
import Main from "./Main";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    maxWidth: 500,
    margin: "0 auto",
    overflow: "hidden",
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
          <AddForm />
        </Route>
        <Redirect to="/main" />
      </Switch>
    </div>
  );
}

export default Layout;
