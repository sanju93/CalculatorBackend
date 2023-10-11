let express = require("express");
let app = express();
let fileUpload = require('express-fileupload');
require('./config/mongoose');
require('./config/passport_jwt');

let port = 5000;
app.use(express.json());
app.use(fileUpload());



app.use("/", require("./routes/index"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("server runs");
});
