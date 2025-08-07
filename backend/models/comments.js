const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    blogId:{
        type:String,
        required:false,
    },
    comments:[{
        userid:{
            type:String,
            required:true,
        },
        com_Add:[{
            type:String,
            required:true
        }]
    }]

}
);
module.exports = mongoose.model('Comment', commentSchema);
