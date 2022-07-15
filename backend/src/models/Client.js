import { Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    activity: {
      type: String,
      trim: true,
      require: true,
    },
    company: {
      type: String,
      trim: true,
      require: true,
    },
    regimen: {
      type: String,
      trim: true,
      require: true,
    },
    id_type: {
      type: String,
      trim: true,
      require: true,
    },
    id_no: {
      type: Number,
      require: true,
    },
    departament: {
      type: String,
      require: true,
    },
    municipality: {
      type: String,
      require: true,
    },
    tel: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    web_site: {
      type: String,
    },
    employees_no: {
      type: Number,
      require: true,
    },
    contact: [
      {
        name: {
          type: String,
          require: true,
          trim: true,
        },
        last_name: {
          type: String,
          require: true,
          trim: true,
        },
        tel: {
          type: Number,
          require: true,
        },
        email: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model("Client", clientSchema);
