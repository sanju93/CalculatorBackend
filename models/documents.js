let mongoose = require('mongoose');

let documentsSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    }
},{
    timestamps : true
});


let Documents = mongoose.model('Documents',documentsSchema);

module.exports = Documents;