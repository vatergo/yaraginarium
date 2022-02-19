import { Schema, model } from "mongoose";

const schema = new Schema({
  phrase: { type: String, required: true },
});

export default model("Phrase", schema);
