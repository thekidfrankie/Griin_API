
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Question = sequelize.define(
  "questions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.INTEGER,
    },
    questionContent: {
      type: DataTypes.STRING,
    },  
    answers: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: true,
  }
);
