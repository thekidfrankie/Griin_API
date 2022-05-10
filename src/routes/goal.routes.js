import express from "express";
import {
  createGoal,
} from "../controllers/goal.controller.js";


const router = express.Router();
// Etf CRUD
router.post("/createGoal", createGoal);
router.post("/getGoals/:id", createGoal);

export default router;
