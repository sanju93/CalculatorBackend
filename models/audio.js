
let mongoose = require('mongoose');
let audioSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }
},{timestamps : true});


let Audio = mongoose.model('Audio',audioSchema);

module.exports = Audio;