const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    CalcPass : {
        type : String
    },
    Gallery : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Gallery'
        }
    ],
    videos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Videos'
    }],
    documents : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Documents'
    }],
    audio : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Audio'
    }]
},{
    timestamps : true
})

const User = mongoose.model('User',userSchema);
module.exports = User;