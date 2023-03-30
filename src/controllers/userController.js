const userServices = require('../services/userService');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isLoginOk = await userServices.loginValidation(email, password);

    if (isLoginOk.token) return res.status(isLoginOk.status).json({ token: isLoginOk.token });

    return res.status(isLoginOk.status).json({ message: isLoginOk.message });
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const data = await userServices
      .createUserValidation(displayName, email, password, image);

    if (data.token) return res.status(201).json({ token: data.token });

    return res.status(data.status).json({ message: data.message });
  } catch (error) {
    console.log(error.message);
  }
};

const getUsers = async (_req, res) => {
  const users = await userServices.getUsers();
  return res.status(users.status).json(users.users);
};

const userGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await userServices.userGetById(id);

    if (userId.status === 200) return res.status(userId.status).json(userId.user);

    return res.status(userId.status).json({ message: userId.message });
  } catch (error) {
    console.log(error);
  }
};

const deleteMe = async (req, res) => {
  const { id } = req.authUser;
  const statusNumber = await userServices.deleteMe(id);
  return res.status(statusNumber).end();
};

module.exports = { userLogin, createUser, getUsers, userGetById, deleteMe };