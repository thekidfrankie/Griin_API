import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  // updateTask,
  deleteUser,
  loginUser,
} from "../controllers/users.controller.js";


const router = express.Router();
// User CRUD
router.post("/signin,", loginUser)
router.post("/signup", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
// router.put("/tasks/:id", updateTask);
router.delete("/users/:id", deleteUser);

export default router;
