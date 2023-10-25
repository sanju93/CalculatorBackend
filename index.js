let express = require("express");
let app = express();
let fileUpload = require('express-fileupload');
require('./config/mongoose');
require('./config/passport_jwt');
require('dotenv').config();
let cors = require('cors');
app.use(cors({origin : "https://vocal-bavarois-6ca22d.netlify.app",optionsSuccessStatus : 200}))
let port = 5000 || process.env.port;
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
