const express = require('express');
const userRouter = express.Router();
const Controllers = require('../controllers/userCon');
userRouter.get('/all', Controllers.getAllblog);
userRouter.get('/all/:id',Controllers.getContent);

module.exports = userRouter;