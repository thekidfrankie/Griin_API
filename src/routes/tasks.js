import express from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const router = express.Router();

// task CRUD
router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
