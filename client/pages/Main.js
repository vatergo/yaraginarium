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
import { shuffle } from "../utils";

const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
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
    textAlign: "center",
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
