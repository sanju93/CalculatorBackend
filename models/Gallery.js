

let mongoose = require('mongoose');

let gallerySchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }
},{
    timestamps : true
});


let Gallery = mongoose.model('Gallery',gallerySchema);

module.exports = Gallery;

