import express from "express";
import {
  createUser,
  loginUser,
  refreshToken,
  // logout
} from "./auth.controller.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();
// auth
router.post("/signin", loginUser);
router.post("/signup", createUser);
router.post("/refreshToken", auth, refreshToken);
// router.post("/logout", auth, logout);
export default router;
