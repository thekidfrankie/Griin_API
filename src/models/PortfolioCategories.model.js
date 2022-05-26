// import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
// junction table for portfolio and categories tables
export const PortfolioCategories = sequelize.define(
  "portfolio_categories",
  {
    categorie_weight:{
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
