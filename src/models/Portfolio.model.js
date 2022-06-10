import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Categories } from "./Categories.model.js";
import { Etf } from "./Etf.model.js";
// id PK
// name: string
// risk profile: string
// etf: json
// rentability: int
// composition: json
// carbon stamp: int
// {
//   "name": "Portafolio Arriesgado Holístico",
//   "risk_profile": "Arriesgado",
//   "esg_score": 8.69,
//   "carbon_instensity": 140.34,
//   "return_ytd": -0.121262,
//   "return_1yr": -0.07454000000000001,
//   "return_3yr": 0.12830899999999998,
//   "description": "Este Portafolio invierte en empresas globales con las mejores credenciales de sustentabilidad. Se enfoca en compañías dedicadas a energías limpias (generación, tecnología y equipamiento) como también en compañías con políticas claras y fuerte de diversidad, promoción de minorías e igualdad de género. En adición tiene exposición a empresas que sus ingresos deriven al menos en un 50% de productos o servicios que cumplan con al menos uno de los objetivos de desarrollo sustentables de la ONU.",
//   "themes": "[Sustentabilidad, Reducción de emisiones, energías limpias, uso eficiente del agua, Diversidad, Objetivos Desarrollo Sustentable de la ONU, Equidad de género]",
//   "etf_list": "[SUSL,ESGD,ICLN,ESGE,SDG,SHE,PHO]",
//   "categories_list": "[CC, SC]",
//   "carbonintensity_portafoliocomparable": 95.79,
//   "benchmark_carbonintensity": 168.07,
//   "diff_carbonintensity": -72.28,
//   "benchmark_returnytd": -0.129505,
//   "benchmar_return1yr": -0.059954999999999994,
//   "benchmark_return3yr": 0.08816500000000001,
//   "benchmark_esgscore": 7.79
//  }

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
    esg_score: {
      type: DataTypes.FLOAT,
    },
    carbon_instensity: {
      type: DataTypes.FLOAT,
    },
    return_ytd: {
      type: DataTypes.FLOAT,
    },
    return_1yr: {
      type: DataTypes.FLOAT,
    },
    return_3yr: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING(600),
    },
    themes: {
      type: DataTypes.JSON,
    },
    etf_list: {
      type: DataTypes.JSONB,
    },
    categories_list: {
      type: DataTypes.JSONB,
    },
    carbonintensity_equivalentportafolio: {
      type: DataTypes.FLOAT,
    },
    benchmark_carbonintensity: {
      type: DataTypes.FLOAT,
    },
    diff_carbonintensity: {
      type: DataTypes.FLOAT,
    },
    benchmark_returnytd: {
      type: DataTypes.FLOAT,
    },   
    benchmark_return1yr: {
      type: DataTypes.FLOAT,
    },   
    benchmark_return3yr: {
      type: DataTypes.FLOAT,
    },   
    benchmark_esgscore: {
      type: DataTypes.FLOAT,
    },   
    
  },
  {
    timestamps: false,
  }
  );
  
  // method that assosiate etf to portfolios, adding them to the junction table "portfolioComposition"
  Portfolio.addEtfList = async (etf_list, portfolio_name) => {
    try {
      // const parsed_etf_list = JSON.parse(etf_list);
    const etfs = await Etf.findAll();
    if(etfs.length == 0){
      return res.status(401).send({message: "no etf found"})
    }
    const portfolio = await Portfolio.findOne({where:{name:portfolio_name}});
    const etfForPortfolio = etfs.filter(etf => etf_list.includes(etf.nemo));
    if(etfForPortfolio.length === 0){
      return res.status(401).send({message:"no etfs found with matching nemos"});
    }
    etfForPortfolio.forEach(async etf => {
      await portfolio.addEtf(
        etf 
      );
    })
    resp.json(resp);
  } catch (error) {
    return error
  }
} 
  // method that assosiate categories to portfolios, adding them to the junction table "portfolioCategories"
  Portfolio.addCategoriesList = async (categories_list, portfolio_name) => {
    try {
      // const parsed_etf_list = JSON.parse(etf_list);
    const categories = await Categories.findAll();
    if(categories.length == 0){
      return res.status(401).send({message: "no categories"})
    }
    const portfolio = await Portfolio.findOne({where:{name:portfolio_name}});
    const categoriesForPortfolio = categories.filter(categorie => categories_list.includes(categorie.nemo));
    if(categoriesForPortfolio.length === 0){
      return res.status(401).send({message:"no categories found with matching nemos"});
    }
    categoriesForPortfolio.forEach(async categorie => {
      await portfolio.addCategories(
        categorie
      );
    })
    resp.json(resp);
  } catch (error) {
    return error
  }
} 
