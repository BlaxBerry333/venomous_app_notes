import { Schema } from "mongoose";

const AccountSchema = new Schema({
  display_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  created_at: {
    type: String,
    default: () => new Date().toISOString(),
  },
  updated_at: {
    type: String,
    default: () => new Date().toISOString(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

export default AccountSchema;
