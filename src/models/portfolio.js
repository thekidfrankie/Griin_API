import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

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
    etf: {
      type: DataTypes.JSON,
    },
    rentability: {
      renta: DataTypes.INTEGER,
    },
    composition: {
      renta: DataTypes.JSON,
    },
    carbon_footprint: {
      renta: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);
