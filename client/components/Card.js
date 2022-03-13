import { Paper, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: 32,
    marginBottom: 96,
    position: "relative",
    width: "85%",
    height: "50vh",
    cursor: "pointer",
    perspective: 1000,
  },
  card: {
    padding: 32,
    transition: "transform .5s",
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
    border: "none",
    position: "absolute",
    top: 0,
    left: 0,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  phrase: {
    userSelect: "none",
    textAlign: "center",
    fontSize: 25,
    transition: ".5s",
    "@media (min-width: 376px)": {
      fontSize: 36,
    },
  },
}));

export default function Card({
  rotate,
  onClickFront,
  onClickBack,
  phraseFront,
  phraseBack,
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper
        variant="outlined"
        className={classes.card}
        style={{ transform: `rotateY(${rotate * 180}deg)` }}
        onClick={onClickFront}
      >
        <Typography display="block" className={classes.phrase}>
          {phraseFront}
        </Typography>
      </Paper>
      <Paper
        variant="outlined"
        className={classes.card}
        style={{
          transform: `rotateY(${(rotate + 1) * 180}deg)`,
        }}
        onClick={onClickBack}
      >
        <Typography display="block" className={classes.phrase}>
          {phraseBack}
        </Typography>
      </Paper>
    </div>
  );
}
