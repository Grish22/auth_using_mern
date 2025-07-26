const express = require('express');
const hostRouter = express.Router();
const Controllers = require('../controllers/hostCon');
hostRouter.get('/all/:id', Controllers.getAllblog);
hostRouter.post('/create', Controllers.createBlog);
hostRouter.put('/edit/:id', Controllers.editBlog);
hostRouter.delete('/delete/:id', Controllers.deleteBlog);
module.exports = hostRouter;
