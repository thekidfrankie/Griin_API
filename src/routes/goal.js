import express from "express";
import {
  createGoal,
} from "../controllers/goal.controller.js";


const router = express.Router();
// Etf CRUD
router.post("/etf", createGoal);

export default router;
