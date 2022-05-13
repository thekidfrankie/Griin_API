
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const User = sequelize.define(
  "users",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4 ,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },  
    password: {
      type: DataTypes.STRING,
    },
    riskProfile: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    run: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  },
  {
    timestamps: true,
  }
);

