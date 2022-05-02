// import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
// junction table for portfolio and etf tables
export const PortfolioComposition = sequelize.define(
  "portflio_composition",
  {
    etfAmount:{
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
