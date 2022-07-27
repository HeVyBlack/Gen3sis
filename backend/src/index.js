import app from "./app";
import "dotenv/config";
import "./mongo";

// Check if there's a PORT ready for use, or, use 3001 as port
const port = parseInt(process.env.PORT) || 3001;

// listen port
app.listen(port, () => {
  console.log("Server on port", port);
});
