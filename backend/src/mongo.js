import mongoose from "mongoose";

// Connect Mongoose with MongoDb data base provided
mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => console.log("Db is connected"))
  .catch((err) => console.log(err));
