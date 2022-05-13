import express from "express";
import {
  createPortfolio,
  getAllPortfolios,
  UpdatePortfolio,
  getPortfolio,
  deletePortfolio,
} from "../controllers/portfolio.controller.js";


const router = express.Router();
// Portfolio CRUD
router.post("/portfolio", createPortfolio);
router.get("/portfolios", getAllPortfolios);
router.get("/portfolio/:risk_profile/:personal_values/:invest_duration", getPortfolio);
router.put("/portfolio/:id", UpdatePortfolio);
router.delete("/portfolio/:id", deletePortfolio);

export default router;
