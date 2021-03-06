import {
  Button,
  CircularProgress,
  Paper,
  makeStyles,
  Snackbar,
  TextField,
  IconButton,
} from "@material-ui/core";
import { ArrowBackIosOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import SmallLogo from "../components/SmallLogo";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  paper: {
    padding: 32,
    position: "relative",
    width: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 30,
    border: "none",
  },
  button: {
    width: "100%",
    borderRadius: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: "#ff0000",
    fontSize: 36,
    "&:hover": {
      backgroundColor: "#d70000",
    },
  },
  textField: {
    "& > div": {
      borderRadius: 20,
    },
    "& label.Mui-focused": {
      color: "#ff0000",
    },
    "& .Mui-focused.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#ff0000",
      },
    width: "100%",
    marginBottom: 28,
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 12,
    color: "#ff0000",
    opacity: 0.6,
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
        <>
          <Link to="/main">
            <IconButton className={classes.backButton}>
              <ArrowBackIosOutlined fontSize="large" />
            </IconButton>
          </Link>
          <SmallLogo />
          <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
              <TextField
                label="Введите новую фразу"
                variant="outlined"
                className={classes.textField}
                onChange={({ target }) => {
                  setPhrase(target.value);
                }}
                multiline
                rows={2}
              />
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={addPhrase}
                className={classes.button}
                disabled={!phrase}
              >
                Добавить
              </Button>
            </Paper>
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
