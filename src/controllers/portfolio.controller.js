import { Portfolio } from "../models/Portfolio.model.js";
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
        categories_list: portfolio.categories_list,
        etf_list: portfolio.etf_list
      },
    );
    await Portfolio.addEtfList(portfolio.etf_list, portfolio.name );
    await Portfolio.addCategories(portfolio.categories_list, portfolio.name);
    // console.log(resp)
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
    const { risk_profile, personal_values, invest_duration } = req.params;
    // if the duration is less than a year for regulatory terms we only can recommend a conservative risk profile portfolio
    if(invest_duration <=1 ){
      const portfolio = await Portfolio.findOne({where:{risk_profile: "conservador"}});
      return res.json(portfolio);
    }
    const portfolios = await Portfolio.findAll({ where: { risk_profile: risk_profile } });
    if (!portfolios) {
      return res.status(404).json({ status: 0, message: "Portfolios for that risk profile not found" });
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
      const portfolio = await Portfolio.findOne({
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
