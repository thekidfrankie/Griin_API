import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();
// User CRUD
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/users/:id",  deleteUser);

export default router;
