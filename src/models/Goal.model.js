
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.model.js";
import { Portfolio } from "./Portfolio.model.js";
export const Goal = sequelize.define(
  "goals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
  );
// User.hasMany(Goal);
// Goal.belongsTo(User);
// Goal.bolongsTo(Portfolio);