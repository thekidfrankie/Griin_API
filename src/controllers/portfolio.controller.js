import { Categories } from "../models/Categories.model.js";
import { Etf } from "../models/Etf.model.js";
import { Portfolio } from "../models/Portfolio.model.js";
import { Op } from "sequelize";
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
        return_ytd: portfolio.return_ytd,
        return_1yr: portfolio.return_1yr,
        return_3yr: portfolio.return_3yr,
        description: portfolio.description,
        themes: portfolio.themes,
        categories_list: portfolio.categories_list,
        etf_list: portfolio.etf_list,
        carbonintensity_portafoliocomparable: portfolio.carbonintensity_portafoliocomparable,
        benchmark_carbonintensity: portfolio.benchmark_carbonintensity,
        diff_carbonintensity: portfolio.diff_carbonintensity,
        benchmark_returnytd: portfolio.benchmark_returnytd,
        benchmar_return1yr: portfolio.benchmar_return1yr,
        benchmark_return3yr: portfolio.benchmark_return3yr,
        benchmark_esgscore: portfolio.benchmark_esgscore
      },
    );
    await Portfolio.addEtfList(portfolio.etf_list, portfolio.name );
    await Portfolio.addCategoriesList(portfolio.categories_list, portfolio.name);
    // console.log(resp)
    res.json(newPortfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loadPortfoliosBatch = async (req, res) => {
  try {
    const etfs = await Etf.findAll();
    const categories = await Categories.findAll();
    if(categories.length === 0){
      return res.json({message: "no categories where found"})
    }
    if(etfs.length === 0){
      return res.json({message: "no ETFS where found"})
    }
    const portfolios = req.body;
    portfolios.forEach(async element => {
      const existingPortfolio = await Portfolio.findOne({ where: { name: element.name } });
      if (existingPortfolio) {
        return res.status(411).json({ message: "the portfolio is already created" });
      }
      await Portfolio.create(
        {
          name: element.name,
          risk_profile: element.risk_profile,
          esg_score: element.esg_score,
          carbon_instensity: element.carbon_instensity,
          return_ytd: element.return_ytd,
          return_1yr: element.return_1yr,
          return_3yr: element.return_3yr,
          description: element.description,
          themes: element.themes,
          categories_list: element.categories_list,
          etf_list: element.etf_list,
          carbonintensity_portafoliocomparable: element.carbonintensity_portafoliocomparable,
          benchmark_carbonintensity: element.benchmark_carbonintensity,
          diff_carbonintensity: element.diff_carbonintensity,
          benchmark_returnytd: element.benchmark_returnytd,
          benchmar_return1yr: element.benchmar_return1yr,
          benchmark_return3yr: element.benchmark_return3yr,
          benchmark_esgscore: element.benchmark_esgscore
        },
      );
      await Portfolio.addEtfList(element.etf_list, element.name );

      await Portfolio.addCategoriesList(element.categories_list, element.name);
});
    // console.log(resp)
    res.json({status:200, message:"all portfolios loaded with their asossiation"});
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

// method to deliver the recomended portfolio for the users
export const getPortfolio = async (req, res) => {
  try {
    const { risk_profile, personal_values, invest_duration } = req.body.body;
    // if the duration is less than a year for regulatory terms we only can recommend a conservative risk profile portfolio
    if(!risk_profile || !personal_values || !invest_duration){
      console.log("error missing parameters")
      return res.status(401).json({message:"error missing parameters"})
    }

    // case where the investement time will be less than 1 year, for regultaions we have to recomend a conservative profile portfolio
    if(invest_duration <=1 ){
      const conservativePortfolios = await Portfolio.findAll({where:{risk_profile: "Conservador"}});
      console.log( risk_profile, personal_values, invest_duration)
      if(!conservativePortfolios){
        return res.status(401).json({ status: 0, message: "Portfolio not found" });
      } else{
        let portfolio = [];
        conservativePortfolios.forEach(actualPortfolio => {
          if(JSON.stringify(actualPortfolio.dataValues.categories_list) == JSON.stringify(personal_values)){
            portfolio = actualPortfolio;
         }
        });
        return res.json(portfolio);
      }
    }
    const portfolios = await Portfolio.findAll({ where: { risk_profile: risk_profile }});
    if (!portfolios) {
      return res.status(401).json({ status: 0, message: "Portfolio not found" });
    }
    let portfolio = [];
    portfolios.forEach(actualPortfolio => {
      // since this array is always very small this solution (stringify arrays) is viable but if in the future the arrays get very big please change solution for a more optimized one
      if(JSON.stringify(actualPortfolio.dataValues.categories_list) == JSON.stringify(personal_values)){
        portfolio = actualPortfolio;
     }
    });

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
