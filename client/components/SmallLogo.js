import { makeStyles } from "@material-ui/core";
import React from "react";

import SmallLogoImage from "../assets/SmallLogo.svg";

const useStyles = makeStyles(() => ({
  logo: {
    position: "absolute",
    animationName: "rotationLeft",
    animationDuration: "60s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    top: -118,
    right: -118,
    userSelect: "none",
  },
}));

export default function SmallLogo() {
  const classes = useStyles();

  return <img src={SmallLogoImage} className={classes.logo} />;
}
