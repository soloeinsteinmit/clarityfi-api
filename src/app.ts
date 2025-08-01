/**
 * Entry point of my Express App
 */
import express, { Express } from "express";
import userRouter from "./routes/user.route";

const app: Express = express();

// Middleware
app.use(express.json()); // Parse JSON request body

// Routes
app.use("/api/users", userRouter); // e.g., https://clarityfi.com/api/users

export default app;
