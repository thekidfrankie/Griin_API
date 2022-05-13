import {User} from "./User.model.js";
import {Portfolio} from "./Portfolio.model.js";
import {Etf} from "./Etf.model.js";
import {Goal} from "./Goal.model.js";
import {PortfolioComposition} from "./PortfolioComposition.model.js";
import { RefreshToken } from "./RefreshToken.model.js";
import { PortfolioCategories } from "./PortfolioCategories.model.js"
import { Categories } from "./Categories.model.js"

//goals realtion in the database
Goal.belongsTo(User);
Goal.belongsTo(Portfolio);

// portfolio relations in the database
Portfolio.hasMany(Goal);
Portfolio.belongsToMany(Etf, { through: PortfolioComposition });
Portfolio.belongsToMany(Categories, { through: PortfolioCategories });

// user relations in the database
User.hasMany(Goal);
User.hasOne(RefreshToken);

// etf relations in the database
Etf.belongsToMany(Portfolio, { through: PortfolioComposition });

//refreshToken realtions
RefreshToken.belongsTo(User);

//categories realtions
Categories.belongsToMany(Portfolio, { through: PortfolioCategories });