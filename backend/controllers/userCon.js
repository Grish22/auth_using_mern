const Blog = require('../models/blog');
exports.getAllblog = async (req, res) => {
    await Blog.find()
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

exports.getContent=async(req,res)=>{
    const id=req.params.id;
    console.log("Request received for ID:", id);
    console.log("Full request path:", req.path);
    await Blog.findById(id)
    .then(blog =>{
        if(!blog) {
            res.status(404).json({
                message: "Blog not found"
            })
        }
        else{
            res.status(200).json({
            content:blog.content
        })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: "Error fetching content",
            error: err
        });
    })
}