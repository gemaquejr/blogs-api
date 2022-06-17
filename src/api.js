const express = require('express');

const userLogin = require('./controllers/loginController');
const userValidate = require('./controllers/userController');

const validate = require('./middlewares/validateLogin');
const validateUser = require('./middlewares/validateUser');
const tokenValidate = require('./middlewares/tokenValidate');

// ...

const app = express();

app.use(express.json());
app.post('/login', validate.validateLogin, userLogin.loginController);
app.get('/user', tokenValidate.authToken, userValidate.getAllUsers);
app.get('/user/:id', tokenValidate.authToken, userValidate.getUserId);
app.post('/user', validateUser.validateUser, userValidate.userController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;