'use strict';
const etfs = require('../seed_data/BBDD ETF refactor (1).json');
const portfolio = require('../seed_data/BBDD Matriz Portafolios (1).json');

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('portfolios', portfolio, {});

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
