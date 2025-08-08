const Blog = require('../models/blog');
const View=require ('../models/view');
const Reaction=require('../models/like')
const Comment=require('../models/comments')
exports.getAllblog = async (req, res) => {

    await Blog.find().populate('author','firstName lastName ')
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

exports.updatedview=async (req,res) =>{
    const id=req.params.id;
    const {userid} = req.body;
    console.log("user find: ",userid);
    console.log("Updated View :",id);
    try{
        const data = await View.findOne({id:id});
        if(data){
            if(data.userid.includes(userid)==false){
                data.view=Number(data.view)+1;
                data.userid.push(userid);
                await data.save();
                return res.status(201);
            }
            
        }
        else{
            const newdata= new View({
                id,
                view:1,
                userid

            })
            await newdata.save();
            return res.status(201);
        }

    }
    catch(err){
        return res.status(500).json({
            "message":"error occured "
        })
    }

};

exports.getView=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    View.findOne({id:id})
    .then(data => {
        if(data){
            console.log(data.view);
            res.status(201).json({
                view:data.view,
            })
        }
        else{
            res.status(201).json({
                view:'0',
            })
        }
        
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
}


exports.postAction=async(req,res)=>{
    const id=req.params.id;
    const {userid,feature}=req.body;
    try{
        const data = await Reaction.findOne({blogId:id}) 
        let check = false
        if(data){
            for (let obj of data.user){
                if(obj.userId==userid){
                    if(obj.reaction==feature){
                        console.log("postman :",obj.reaction) 
                        data[obj.reaction] = Number(data[obj.reaction]) - 1
                        data.user= data.user.filter((obj)=> obj.userId!=userid);
                    }
                    else{
                        data[obj.reaction]= Number(data[obj.reaction]) -1
                        obj.reaction = feature;
                        data[feature] = Number(data[feature]) + 1
                    }
                    check=true
                }
            }
            if(!check){
                const obj1 = {userId:userid , reaction: feature}
                data.user.push(obj1)
                data[feature]=Number(data[feature]) + 1
            }
            await data.save();
            return res.status(201).json({
                like:data.like,
                dislike:data.dislike
            })
        }
        else{
            const data = new Reaction({
                blogId:id,
                [feature]:1,
                user:[{userId:userid , reaction: feature}]
            })
            await data.save();
            return res.status(201).json({
                like:data.like,
                dislike:data.dislike
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"error occured "
        })
    }
}

exports.getAction=async(req,res)=>{
    const  id=req.params.id;
    console.log("id : ",id)
    try{
        const data = await Reaction.findOne({blogId:id});
        console.log("data : ",data )
        if(data){
            return res.status(201).json({
                
                like:data.like,
                dislike:data.dislike
            })
        }
        else{
            return res.status(201).json({
                data:"No data found"
            })

        }
    }
    catch(error){
        return res.status(500).json({
            message:"error "
        })
    }
}

exports.addComment=async(req,res)=>{
    const id= req.params.id;
    const {comment,userid}=req.body;
    let check=false
    try{
        const data = await Comment.findOne({blogId:id})
        if(data){
            for(let obj of data.comments ){
                if(obj.userid==userid){
                    console.log("hello")
                    console.log(obj.com_Add)
                    obj.com_Add.push(comment);
                    console.log("hello")
                    check=true;
                    break;
                }
            }
            if(!check){
                data.comments.push({
                    userid:userid,
                    com_Add:[comment]
                })
            }
            await data.save();
            return res.status(201).json({
                message:"comment added successfully"
            })
        }
        else{
            const data= new Comment({
                blogId:id,
                comments:[{
                    userid:userid,
                    com_Add:[comment]
                }]
            })
            await data.save();
            return res.status(201).json({
                message:"comment added successfully"
            })
        }

    }
    catch(err){
        return res.status(500).json({
                message:"error occur "
            })
    }
}

exports.getComment=async(req,res)=>{
    const id= req.params.id;
    console.log("comment ji ")
    try{
        const data = await Comment.findOne({blogId:id});
        if(data){
            console.log(data.comments)
            return res.status(201).json({
                data:data.comments
            })
        }
        else{
            return res.status(201).json({
                data:"No comment found"
            })
        }
        
    }
    catch(err){
        return res.status(500).json({
            message:"Error occured "
        })
    }
}

