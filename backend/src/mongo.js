import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => console.log("Db is connected"))
  .catch((err) => console.log(err));
