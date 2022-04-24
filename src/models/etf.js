import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

// id PK
// name: string
// administrator: string
// nemo: string
// url: int
// value_type: string
// financial_instrument: string

export const Etf = sequelize.define(
  "etf",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    administrator: {
      type: DataTypes.STRING,
    },
    nemo: {
      type: DataTypes.STRING,
    },
    url: {
      renta: DataTypes.STRING,
    },
    value_type: {
      renta: DataTypes.STRING,
    },
    financial_instrument: {
      renta: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);