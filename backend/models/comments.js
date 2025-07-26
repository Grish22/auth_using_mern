const mongoose = require('mongoose');
const reactionSchema = new mongoose.Schema({
    blogId:{
        type:String,
        required:true,
    },
    likes:{
        type:String,
        required:true,
    },
    dislikes:{
        type:String,
        required:true,
    },
    comments:{
        type:String,
        required:true,
    }

}
);
module.exports = mongoose.model('Reaction', reactionSchema);
