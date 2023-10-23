
let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanjay139474:sanjay139474@cluster0.qopktum.mongodb.net/Calculator?retryWrites=true&w=majority')
.then(() => {
    console.log("database connected");
},
(err) => {
    console.log(err);
})


module.exports = mongoose;