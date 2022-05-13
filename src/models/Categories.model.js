import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nemo: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(500),
    },
  },
  {
    timestamps: false,
  }
);