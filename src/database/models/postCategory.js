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
            otherKey: 'BlogPostId',
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'Category',
            through: PostCategory,
            foreignKey: 'BlogPostId',
            otherKey: 'categoryId',
        });
    };
  
    return PostCategory;
  };
  
  module.exports = PostCategory;