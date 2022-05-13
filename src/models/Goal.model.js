
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Goal = sequelize.define(
  "goals",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4 ,
      primaryKey: true,
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