import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  // updateTask,
  deleteUser,
  loginUser,
} from "../controllers/users.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
// User CRUD
router.post("/signin,", auth, loginUser)
router.post("/signup", auth, createUser);
router.get("/users", auth, getAllUsers);
router.get("/users/:id", auth, getUser);
// router.put("/user/:id", auth, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
