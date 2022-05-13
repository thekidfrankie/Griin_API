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
router.get("/users/:uuid", getUser);
router.put("/user/:uuid", updateUser);
router.delete("/users/:uuid",  deleteUser);

export default router;
