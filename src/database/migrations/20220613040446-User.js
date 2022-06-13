'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
       },
       displayName: {
        type: Sequelize.STRING,
       },
       email: {
        type: Sequelize.STRING,
       },
       password: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       image: {
        type: Sequelize.STRING,
       }
    });  
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
