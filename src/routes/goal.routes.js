import express from "express";
import {
  createGoal,
  getAllUserGoals,
  UpdateGoal,
  deleteGoal
} from "../controllers/goal.controller.js";


const router = express.Router();
// Etf CRUD
router.post("/creategoal", createGoal);
router.post("/getgoals/:uuid", getAllUserGoals);
router.post("/updategoal/:uuid", UpdateGoal);
router.post("/deletegoal/:uuid", deleteGoal);

export default router;
