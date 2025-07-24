const express = require('express');
const authRouter = express.Router();
const Controllers = require('../controllers/auth');
authRouter.post('/login',Controllers.postLogin);
authRouter.post('/logout',Controllers.postLogout);
authRouter.post('/signup',Controllers.postsignup)
module.exports = authRouter;