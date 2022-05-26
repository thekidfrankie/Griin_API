import express from "express";
import {
  createPortfolio,
  getAllPortfolios,
  UpdatePortfolio,
  getPortfolio,
  deletePortfolio,
  loadPortfoliosBatch,
} from "../controllers/portfolio.controller.js";


const router = express.Router();
// Portfolio CRUD
router.post("/portfolio", createPortfolio);
router.get("/portfolios", getAllPortfolios);
router.post("/loadPortfolios", loadPortfoliosBatch);
router.post("/recomendPortfolio", getPortfolio);
router.put("/portfolio/:id", UpdatePortfolio);
router.delete("/portfolio/:id", deletePortfolio);

export default router;
