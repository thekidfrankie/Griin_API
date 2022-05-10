import express from "express";
import {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questions.controller.js";


const router = express.Router();
// User CRUD
router.post("/question", createQuestion);
router.get("/questions", getAllQuestions);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

export default router;
