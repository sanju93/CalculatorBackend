
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Calculator')
.then(() => {
    console.log("database connected");
},
(err) => {
    console.log(err);
})


module.exports = mongoose;