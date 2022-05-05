import { Portfolio } from "../models/Portfolio.js";

// "name": 
// "risk_profile": 
// "esg_score": 
// "carbon_instensity": 
// "rentability_ytd": 
// "rentability_1yr": 
// "rentability_3yr": 
// "description": 

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = req.body;
    const existingPortfolio = await Portfolio.findOne({ where: { name: portfolio.name } });
    if (existingPortfolio) {
      return res.status(411).json({ message: "the portfolio is already created" });
    }
    let newPortfolio = await Portfolio.create(
      {
        name: portfolio.name,
        risk_profile: portfolio.risk_profile,
        esg_score: portfolio.esg_score,
        carbon_instensity: portfolio.carbon_instensity,
        rentability_ytd: portfolio.rentability_ytd,
        rentability_1yr: portfolio.rentability_1yr,
        rentability_3yr: portfolio.rentability_3yr,
        description: portfolio.description,

      },
    );
    res.json(newPortfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllPortfolios = async (req, res) => {
  try {
    const allPortfolio = await Portfolio.findAll();
    res.json(allPortfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findOne({ where: { id: id } });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const UpdatePortfolio = async (req, res) => {
    try {
      const { id } = req.params;
      const portfolio = await findOne({
        where: {id:id}
      });
      portfolio.set(req.body);
      await portfolio.save();
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Portfolio.destroy({
      where: {
        userId: id,
      },
    });
    console.log(result)
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
