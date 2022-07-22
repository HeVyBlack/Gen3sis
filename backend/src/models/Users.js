import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
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
    type: {
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

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async(password) => {
  return bcrypt.compare(password, this.password)
}

export default model("Users", userSchema);
