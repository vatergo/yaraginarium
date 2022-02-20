import express, { json } from "express";
import path from "path";
import config from "config";
import { connect } from "mongoose";
import phrases from "./routes/phrases";

const port = process.env.PORT || 3001;

const database = config.get("database");

const app = express();

app.use(json());

app.use("/api/phrases", phrases);

app.use("/", express.static(path.join(__dirname, "../public")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../public", "index.html"));
});

connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
}).catch(({ message }) => console.error(message));

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
