import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { shuffle } from "../utils";

const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
    color: "#70757a",
    position: "relative",
    width: "75vw",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  phrase: {
    cursor: "pointer",
    userSelect: "none",
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const getData = useCallback(() => {
    setLoading(true);
    setError("");
    axios
      .get(`/api/phrases`)
      .then(({ data }) => {
        setData(shuffle(data));
        setLoading(false);
      })
      .catch((er) => {
        setLoading(false);
        setError("Произошла ошибка");
        console.error(er);
      });
  }, []);

  return (
    <>
      {!loading && data.length === 0 && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={getData}
        >
          Начать игру
        </Button>
      )}
      {loading && <CircularProgress />}
      {!loading && data.length > 0 && (
        <Paper variant="outlined" className={classes.root}>
          {data.length !== 0 && currentPhraseIndex > data.length - 1 ? (
            <Typography variant="h3" display="block">
              Фразы закончились
            </Typography>
          ) : (
            <>
              <Typography
                variant="h3"
                display="block"
                onClick={() => setCurrentPhraseIndex(currentPhraseIndex + 1)}
                className={classes.phrase}
              >
                {data[currentPhraseIndex].phrase}
              </Typography>
            </>
          )}
        </Paper>
      )}
      {error && (
        <Typography variant="h3" display="block">
          {error}
        </Typography>
      )}
    </>
  );
}
