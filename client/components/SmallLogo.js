import { makeStyles } from "@material-ui/core";
import React from "react";

import SmallLogoImage from "../assets/SmallLogo.svg";

const useStyles = makeStyles(() => ({
  logo: {
    position: "absolute",
    animationName: "rotation",
    animationDuration: "60s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    top: -134,
    right: -134,
    userSelect: "none",
  },
}));

export default function SmallLogo() {
  const classes = useStyles();

  return <img src={SmallLogoImage} className={classes.logo} />;
}
