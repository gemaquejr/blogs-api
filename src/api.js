const express = require('express');

const userLogin = require('./controllers/loginController');

const validate = require('./middlewares/validateLogin');

// ...

const app = express();

app.use(express.json());
app.post('/login', validate.validateLogin, userLogin.loginController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;