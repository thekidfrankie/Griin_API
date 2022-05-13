import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Categories } from "./Categories.model.js";
import { Etf } from "./Etf.model.js";
// id PK
// name: string
// risk profile: string
// etf: json
// rentability: int
// composition: json
// carbon stamp: int

export const Portfolio = sequelize.define(
  "portfolios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    risk_profile: {
      type: DataTypes.STRING,
    },
    esg_score: {
      type: DataTypes.FLOAT,
    },
    carbon_instensity: {
      type: DataTypes.FLOAT,
    },
    rentability_ytd: {
      type: DataTypes.FLOAT,
    },
    rentability_1yr: {
      type: DataTypes.FLOAT,
    },
    rentability_3yr: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING(600),
    },
    categories_list: {
      type: DataTypes.JSON,
    },
    etf_list: {
      type: DataTypes.JSON,
    },
    
  },
  {
    timestamps: false,
  }
  );
  
  // method that assosiate etf to portfolios, adding them to the junction table "portfolioComposition"
  Portfolio.addEtfList = async (etf_list, portfolio_name) => {
    try {
      // const parsed_etf_list = JSON.parse(etf_list);
    const etfs = await Etf.findAll();
    const portfolio = await Portfolio.findOne({where:{name:portfolio_name}});
    const etfForPortfolio = etfs.filter(etf => etf_list.includes(etf.nemo));
    etfForPortfolio.forEach(async etf => {
      await portfolio.addEtf(
        etf 
      );
    })
    resp.json(resp);
  } catch (error) {
    return error
  }
} 
  // method that assosiate categories to portfolios, adding them to the junction table "portfolioCategories"
  Portfolio.addCategories = async (categories_list, portfolio_name) => {
    try {
      // const parsed_etf_list = JSON.parse(etf_list);
    const categories = await Categories.findAll();
    const portfolio = await Portfolio.findOne({where:{name:portfolio_name}});
    const categoriesForPortfolio = categories.filter(categorie => categories_list.includes(categorie.name));
    categoriesForPortfolio.forEach(async categorie => {
      await portfolio.addCategories(
        categorie 
      );
    })
    resp.json(resp);
  } catch (error) {
    return error
  }
} 
