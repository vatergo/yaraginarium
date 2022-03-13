import {
  Button,
  CircularProgress,
  Typography,
  makeStyles,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import Card from "../components/Card";
import SmallLogo from "../components/SmallLogo";
import { shuffle } from "../utils";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "85%",
  },
  startButton: {
    height: 110,
    width: 315,
    borderRadius: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: "#ff0000",
    fontSize: 48,
    "&:hover": {
      backgroundColor: "#d70000",
    },
  },
  endButton: {
    color: "#ff0000",
    fontSize: 24,
    "&:hover": {
      backgroundColor: "transparent",
      color: "#d70000",
    },
  },
  addButton: {
    position: "absolute",
    top: 12,
    right: 12,
    color: "#ff0000",
    opacity: 0.6,
  },
  progress: {
    color: "#ff0000",
  },
  title: {
    userSelect: "none",
    textAlign: "center",
    fontSize: 36,
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textSnackbar, setTextSnackbar] = useState("");
  const [rotate, setRotate] = useState(0);
  const [currentPhraseIndexFront, setCurrentPhraseIndexFront] = useState(0);
  const [currentPhraseIndexBack, setCurrentPhraseIndexBack] = useState(-1);

  const getData = useCallback(() => {
    setLoading(true);
    axios
      .get(`/api/phrases`)
      .then(({ data }) => {
        setData(shuffle(data));
        setLoading(false);
      })
      .catch((er) => {
        setLoading(false);
        setTextSnackbar("Произошла ошибка");
        console.error(er);
      });
  }, []);

  const restart = useCallback(() => {
    setData([]);
    setRotate(0);
    setCurrentPhraseIndexFront(0);
    setCurrentPhraseIndexBack(-1);
  }, []);

  return (
    <>
      {!loading && data.length === 0 && (
        <>
          <BigLogo />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={getData}
            className={classes.startButton}
          >
            Погнали!
          </Button>
          <Link to="/add">
            <IconButton className={classes.addButton}>
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </Link>
        </>
      )}
      {loading && <CircularProgress className={classes.progress} size={96} />}
      {!loading && data.length > 0 && (
        <>
          <SmallLogo />
          <div className={classes.root}>
            <Typography display="block" className={classes.title}>
              Ситуэйшн
            </Typography>
            <Card
              rotate={rotate}
              onClickBack={() => {
                if (currentPhraseIndexFront + 1 > data.length - 1) {
                  return;
                }
                setRotate(rotate + 1);

                setCurrentPhraseIndexFront(currentPhraseIndexFront + 2);
              }}
              onClickFront={() => {
                if (currentPhraseIndexBack + 1 > data.length - 1) {
                  return;
                }
                setRotate(rotate + 1);

                setCurrentPhraseIndexBack(currentPhraseIndexBack + 2);
              }}
              phraseFront={
                data.length !== 0 && currentPhraseIndexFront > data.length - 1
                  ? "Фразы закончились =("
                  : data[currentPhraseIndexFront]?.phrase
              }
              phraseBack={
                data.length !== 0 && currentPhraseIndexBack > data.length - 1
                  ? "Фразы закончились =("
                  : data[currentPhraseIndexBack]?.phrase
              }
            />
            <Button
              color="primary"
              disableElevation
              onClick={restart}
              className={classes.endButton}
            >
              Закончить игру
            </Button>
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={!!textSnackbar}
        autoHideDuration={1500}
        onClose={() => setTextSnackbar("")}
        message={textSnackbar}
      />
    </>
  );
}
