import {
  Button,
  CircularProgress,
  Paper,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useState } from "react";

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
  button: {
    marginLeft: 16,
    height: 56,
  },
}));

export default function AddForm() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [textSnackbar, setTextSnackbar] = useState("");
  const [phrase, setPhrase] = useState("");

  const addPhrase = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/phrases", { phrase })
      .then(() => {
        setTextSnackbar("Фраза успешно добавлена");
        setLoading(false);
      })
      .catch((er) => {
        setTextSnackbar("Произошла ошибка");
        setLoading(false);
        console.error(er);
      });
  }, [phrase]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <Paper variant="outlined" className={classes.root}>
          <TextField
            label="Введите новую фразу"
            variant="outlined"
            onChange={({ target }) => {
              setPhrase(target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={addPhrase}
            className={classes.button}
          >
            Добавить
          </Button>
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
