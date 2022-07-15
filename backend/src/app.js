import express from "express";
import cors from "cors";
// Import routes
import indexRoutes from "./routes/index.routes";
import usersRoutes from "./routes/users.routes";

// Init Server
const app = express();

// Middlewares

app.use(express.json()); // --> Show json in console
app.use(cors()); // --> Init cors

// Routes
app.use("/api", indexRoutes);
app.use("/api/users", usersRoutes);

export default app;
