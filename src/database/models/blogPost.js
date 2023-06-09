const BlogPost = (sequelize, DataTypes) => {

    const BlogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, {
      timestamps: false,
    }
    );

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            as: 'user',
            through: BlogPost,
            foreignKey: 'userId',
            otherKey: 'postId',
        });
    };
  
    return BlogPost;
  };
  
  module.exports = BlogPost;