"use strict";
const etfs = require("../seed_data/BBDD ETF refactor (1).json");
const portfolios_list = require("../seed_data/BBDD Matriz Portafolios (1).cjs");
const categories = require("../seed_data/BBDD_CATEGORIES.json")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("portfolios", portfolios_list, {});
    await queryInterface.bulkInsert("etfs", etfs, {});
    await queryInterface.bulkInsert("categories", categories, {});
    // portfolios_list.forEach(async (portfolio) => {
    //   const etf_list = await queryInterface.rawSelect(
    //     "portfolios",
    //     {
    //       where: {
    //         name: portfolio.name,
    //       },
    //     },
    //     ["id", "etf_list"]
    //     );
    //   // const etf = await queryInterface.rawSelect(
    //   //   "etf",
    //   //   {
    //   //     where: {
    //   //       nemo: portfolio.name,
    //   //     },
    //   //   },
    //   //   ["id", "etf_list"]
    //   // );
    //     console.log(user)
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
