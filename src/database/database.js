import Sequelize from "sequelize";
import  {configs}  from "./config/configForNode.js";

const db = configs.db;
export const sequelize = new Sequelize(
  "griin_dev", // db name,
  "postgres", // username
  "root", // password
  {
    host: "localhost",
    dialect: "postgres",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);