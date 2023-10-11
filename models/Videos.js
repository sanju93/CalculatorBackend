let mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }
},{
    timestamps : true
});


let Vidoes = mongoose.model('Videos',videoSchema);

module.exports = Vidoes;