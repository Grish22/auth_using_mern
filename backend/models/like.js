const mongoose = require('mongoose');
const reactionSchema = new mongoose.Schema({
    blogId:{
        type:String,
        required:false,
    },
    like:{
        type:String,
        default:0,
        required:false,
    },
    dislike:{
        type:String,
        default:0,
        required:false,
    },
    user:[
        {
            userId:{
            type:String,
            required:true,
            },
            reaction:{
                type:String,
                required:true,
                enum:['like','dislike']
            } 
        }
    ],
    // comments:{
    //     type:String,
    //     required:false,
    // }

}
);
module.exports = mongoose.model('Reaction', reactionSchema);
