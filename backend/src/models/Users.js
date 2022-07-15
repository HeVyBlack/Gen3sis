import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
      uniquie: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      uniquie: true,
    },
    password: {
      type: String,
      required: true,
    },
    client_type: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Users", userSchema);
