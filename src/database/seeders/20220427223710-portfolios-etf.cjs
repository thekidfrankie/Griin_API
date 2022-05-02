'use strict';
const etfs = require('../seed_data/BBDD ETF refactor (1).json');

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('portfolios', [
      {
        name:"sustentable",
        risk_profile: "arriesgado",
        rentability: 4,
        composition: JSON.stringify({"sustentable": 4, "social": 6 }),
        carbon_footprint: 6000
      },
      {
        name:"sustentable",
        risk_profile: "moderado",
        rentability: 3,
        composition: JSON.stringify({"sustentable": 4, "social": 6 }),
        carbon_footprint: 5000
      },
      {
        name:"sustentable",
        risk_profile: "conservador",
        rentability: 2,
        composition: JSON.stringify({"sustentable": 4, "social": 6 }),
        carbon_footprint: 4000
      }
    ], {});

     await queryInterface.bulkInsert('etfs', etfs , {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
