import { Schema, model } from "mongoose";

const typeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    tel: {
      type: Number,
      require: true,
    },
    profesional_lvl: {
      type: String,
      require: true,
    },
    area: {
      type: String,
      require: true,
    },
    certification: {
      type: String,
      require: true,
      default: "No",
    },
    services_or_platform: String,
  },
  {
    versionKey: false,
  }
);

export default model("Type", typeSchema);
