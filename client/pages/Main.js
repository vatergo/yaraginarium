import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useState } from "react";
import BigLogo from "../components/BigLogo";
import SmallLogo from "../components/SmallLogo";
import { shuffle } from "../utils";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  phraseWrapper: {
    marginTop: 32,
    marginBottom: 96,
    padding: 32,
    position: "relative",
    width: "85vw",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
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
  phrase: {
    userSelect: "none",
    textAlign: "center",
    fontSize: 36,
  },
  progress: {
    color: "#ff0000",
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textSnackbar, setTextSnackbar] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

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
    setCurrentPhraseIndex(0);
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
        </>
      )}
      {loading && <CircularProgress className={classes.progress} size={96} />}
      {!loading && data.length > 0 && (
        <>
          <SmallLogo />
          <div className={classes.root}>
            <Typography display="block" className={classes.phrase}>
              Ситуэйшн
            </Typography>
            <Paper
              variant="outlined"
              className={classes.phraseWrapper}
              onClick={() => {
                if (currentPhraseIndex > data.length - 1) {
                  return;
                }

                setCurrentPhraseIndex(currentPhraseIndex + 1);
              }}
            >
              <Typography display="block" className={classes.phrase}>
                {data.length !== 0 && currentPhraseIndex > data.length - 1
                  ? "Фразы закончились =("
                  : data[currentPhraseIndex].phrase}
              </Typography>
            </Paper>
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
