import express from "express";
import cors from "cors";
import morgan from "morgan";
import taksRouter from "./routes/tasks.js";
import userRouter from "./routes/user.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(taksRouter);
app.use(userRouter);

export default app;