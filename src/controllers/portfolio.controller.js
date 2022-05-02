import { Portfolio } from "../models/Portfolio.js";

// id PK
// name: string
// risk profile: string
// etf: json
// rentability: int
// composition: json
// carbon stamp: int

export const createPortfolio = async (req, res) => {
  try {
    const { name, risk_profile, rentability, composition, carbon_stamp } = req.body;

    const existingPortfolio = await Portfolio.findOne({ where: { name: name } });
    if (existingPortfolio) {
      return res.status(411).json({ message: "the portfolio is already created" });
    }
    let newPortfolio = await Portfolio.create(
      {
        name: name,
        risk_profile: risk_profile,
        rentability: rentability,
        composition: composition,
        carbon_stamp: carbon_stamp
      },
      {
        fields: ["name", "risk_profile", "rentability", "composition", "carbon_stamp"],
      }
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
      const {  name, risk_profile, etf, rentability, composition, carbon_stamp } = req.body;
  
      const result = await Portfolio.findByPk(id);
      result.name = name;
      result.risk_profile = risk_profile;
      result.etf = etf;
      result.rentability = rentability;
      result.composition = composition;
      result.carbon_stamp = carbon_stamp;
      await result.save();
      res.json(result);
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
