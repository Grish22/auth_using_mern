const User = require('../models/user');
const Blog = require('../models/blog');
exports.getAllblog = async (req, res) => {
    const Id = req.params.id;
    await Blog.find({author:Id})
        .then(blogs => {
            res.status(200).json({
                message: "Blogs fetched successfully",
                blogs: blogs
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error fetching blogs",
                error: err.message
            });
        });
}

exports.createBlog = async (req, res) => {
    const { title, content, author } = req.body;
    console.log(title,content,author)
    const newBlog = new Blog({
        title,
        content,
        author
    });
    await newBlog.save()
        .then(blog => {
            res.status(201).json({
                message: "Blog created successfully",
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error creating blog",
                error: err.message
            });
        });
}

exports.deleteBlog= async(req,res)=>{
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId)
        .then(() => {
            res.status(200).json({
                message: "Blog deleted successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error deleting blog",
                error: err.message
            });
        });
}

exports.editBlog=async(req,res)=>{
    const ID = req.params.id;
    const {title,content,author} = req.body;
    console.log("editblog : ",title,content,author,ID)
     await Blog.findByIdAndUpdate(ID,{title,content,author})
     .then(()=>{
        res.status(200).json({
            message: "Blog udpated successfully"
        });
     })
     .catch((err)=>{
        res.status(500).json({
            message: "Error updating blog",
            error: err.message
        });
     })
}