import { makeStyles } from "@material-ui/core";
import React from "react";

import RedLogoImage from "../assets/RedLogo.svg";
import WhiteLogoImage from "../assets/WhiteLogo.svg";

const useStyles = makeStyles(() => ({
  redLogo: {
    position: "absolute",
    animationName: "rotationLeft",
    animationDuration: "60s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    userSelect: "none",
    zIndex: -1,
  },
  whiteLogo: {
    position: "absolute",
    animationName: "rotationRight",
    animationDuration: "60s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    userSelect: "none",
    zIndex: -1,
  },
}));

export default function BigLogo() {
  const classes = useStyles();

  return (
    <>
      <img src={RedLogoImage} className={classes.redLogo} />
      <img src={WhiteLogoImage} className={classes.whiteLogo} />
    </>
  );
}
