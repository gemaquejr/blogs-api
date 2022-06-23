const express = require('express');

const userLogin = require('./controllers/loginController');
const userValidate = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const validate = require('./middlewares/validateLogin');
const validateUser = require('./middlewares/validateUser');
const tokenValidate = require('./middlewares/tokenValidate');
const validateCategory = require('./middlewares/validateCategory');
const validateBlogPost = require('./middlewares/validateBlogPost');

// ...

const app = express();

app.use(express.json());
app.post('/login', validate.validateLogin, userLogin.loginController);
app.get('/user', tokenValidate.authToken, userValidate.getAllUsers);
app.get('/user/:id', tokenValidate.authToken, userValidate.getUserId);
app.post('/user', validateUser.validateUser, userValidate.userController);
app.get('/categories', tokenValidate.authToken, categoryController.getAllCategories);
app.post('/categories',
tokenValidate.authToken, validateCategory.validateCategory, categoryController.categoryController);
app.get('/post',
tokenValidate.authToken, blogPostController.getAllPosts);
app.post('/post',
tokenValidate.authToken, validateBlogPost.validateBlogPost, blogPostController.BlogPostController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;