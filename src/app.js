import express from "express";
import cors from "cors";
import morgan from "morgan";
import portfolio from "./routes/portfolio.js";
import userRouter from "./routes/user.js";
import questionRouter from "./routes/question.js"
import etf from "./routes/etf.js"
import goal from "./routes/goal.js"
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(goal);
app.use(userRouter);
app.use(questionRouter);
app.use(portfolio);
app.use(etf);

// handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;