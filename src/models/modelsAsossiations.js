import {User} from "./User.js";
import {Portfolio} from "./Portfolio.js";
import {Etf} from "./Etf.js";
import {Goal} from "./Goal.js";
import {PortfolioComposition} from "./PortfolioComposition.js";


//goals realtion in the database
Goal.belongsTo(User);
Goal.belongsTo(Portfolio);

// portfolio relations in the database
Portfolio.hasMany(Goal);
Portfolio.belongsToMany(Etf, { through: PortfolioComposition });


// user relations in the database
User.hasMany(Goal);

// etf relations in the database
Etf.belongsToMany(Portfolio, { through: PortfolioComposition });