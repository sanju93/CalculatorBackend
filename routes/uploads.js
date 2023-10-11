
let express = require('express');
let router = express.Router();
let passport = require('passport');

let Uploads = require('../controller/upload');

router.post('/gallery',passport.authenticate('jwt',{session : false}),Uploads.Upload);
router.post('/audio',passport.authenticate('jwt',{session: false}),Uploads.Audio);
router.post('/video',passport.authenticate('jwt',{session : false}),Uploads.video);
router.post('/document',passport.authenticate('jwt',{session : false}),Uploads.Document);

module.exports = router;