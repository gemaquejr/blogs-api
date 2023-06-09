const PostCategory = (sequelize, DataTypes) => {

    const PostCategory = sequelize.define('PostCategory', {
      postId: { type: DataTypes.INTEGER, primaryKey: true },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    }, {
      timestamps: false,
    }
    );

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'BlogPost',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    };
  
    return PostCategory;
  };
  
  module.exports = PostCategory;