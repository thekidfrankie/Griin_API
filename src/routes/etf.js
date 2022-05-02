import express from "express";
import {
  createEtf,
  UpdateEtf,
  deleteEtf,
} from "../controllers/etf.controller.js";


const router = express.Router();
// Etf CRUD
router.post("/etf", createEtf);
router.put("/etf/:id", UpdateEtf);
router.delete("/etf/:id", deleteEtf);

export default router;
