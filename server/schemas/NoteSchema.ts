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
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
  },
});

export default NoteSchema;
