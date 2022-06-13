'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
      references: {
        model: 'BlogPosts',
        key: 'id',
        as: 'postId'
      },
    },
      categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id',
        as: 'categoryId'
      }
    },
   });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
