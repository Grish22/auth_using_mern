const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    view:{
        type:String,
        default:'0',
        required:true,
    },
    userid:[String],
},{
    timestamps:true,
})

module.exports= mongoose.model('View',viewSchema);