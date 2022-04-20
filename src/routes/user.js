import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  // updateTask,
  deleteUser,
} from "../controllers/users.controller.js";


const router = express.Router();
// User CRUD
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
// router.put("/tasks/:id", updateTask);
router.delete("/users/:id", deleteUser);

export default router;
