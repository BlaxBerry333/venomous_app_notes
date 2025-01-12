import { Schema } from "mongoose";

const NoteSchema = new Schema({
  type: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: String,
    default: () => Date.now().toLocaleString(),
  },
  updated_at: {
    type: String,
    default: () => Date.now().toLocaleString(),
  },
  message: {
    type: String,
  },
});

export default NoteSchema;
