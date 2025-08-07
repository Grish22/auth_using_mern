const express = require('express');
const hostRouter = express.Router();
const upload = require('../storage');
const Controllers = require('../controllers/hostCon');
hostRouter.get('/all/:id', Controllers.getAllblog);
hostRouter.post('/create',upload.single('file'), Controllers.createBlog);
hostRouter.put('/edit/:id',upload.single('file'), Controllers.editBlog);
hostRouter.delete('/delete/:id', Controllers.deleteBlog);
module.exports = hostRouter;
