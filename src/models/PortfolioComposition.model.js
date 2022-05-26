// import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
// import { Etf } from "./Etf.model.js";
// import { Portfolio } from "./Portfolio.model.js";
// junction table for portfolio and etf tables
export const PortfolioComposition = sequelize.define(
  "portfolio_composition",
  {
    etfAmount:{
      type: DataTypes.INTEGER,
    },
    etfId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'etfs', 
        key: 'id'
      }
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'portfolios', 
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
  }
);
