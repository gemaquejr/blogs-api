const { BlogPost, Category, PostCategory, User } = require('../database/models');

const BlogPostController = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    
    const categories = await Category.findAll({ where: { id: categoryIds } });
        // Ajuda do Pedrão na mentoria
        if (categories < categoryIds.length) {
            return res.status(400).json({ message: '"categoryIds" not found' });
        }

        const newPost = await BlogPost.create({
            title,
            content,
            userId: id,
            published: Date.now(),
            updated: Date.now(),
        });

        // Ajuda do Pedrão na mentoria
        await PostCategory.bulkCreate(
        categoryIds.map((categoryId) => ({ postId: newPost.id, categoryId })),
        );
        
        return res.status(201).json(newPost);
    };

    const getAllPosts = async (_req, res) => {
        const allPosts = await BlogPost.findAll(
            { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } }],
            },
            );

        return res.status(200).json(allPosts);
    };

    const getPostId = async (req, res) => {
        const { id } = req.params;
        const postId = await BlogPost.findOne( 
            { where: { id },
            include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } }] },
            );
    
        if (!postId) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

        return res.status(200).json(postId);
    };

    const putPostId = async (req, res) => {
        const { id } = req.params;
        const { id: userId } = req.user;
        const { title, content } = req.body;
        const updatePostById = await BlogPost.findOne( 
            { where: { id },
            include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } }] },
            );
            console.log(updatePostById);

        if (userId !== updatePostById.userId) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        const updatedPostById = await updatePostById.update({ title, content });

        return res.status(200).json(updatedPostById);
    };
            
    module.exports = { BlogPostController, getAllPosts, getPostId, putPostId };