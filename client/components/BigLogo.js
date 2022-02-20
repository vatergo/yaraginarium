import { makeStyles } from "@material-ui/core";
import React from "react";

import BigLogoImage from "../assets/BigLogo.svg";

const useStyles = makeStyles(() => ({
  logo: {
    position: "absolute",
    animationName: "rotation",
    animationDuration: "60s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  },
}));

export default function BigLogo() {
  const classes = useStyles();

  return <img src={BigLogoImage} className={classes.logo} />;
}
