import app from "./app";
import "dotenv/config";
import "./mongo";

const port = parseInt(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log("Server on port", port);
});
