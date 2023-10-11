let express = require('express');
let router = express.Router();
let User = require('../controller/usersController');
let passport = require('passport');

router.post('/signIN',User.signIN);

router.post('/signUp',User.SignUp);

router.get('/newUser',passport.authenticate('jwt',{session : false}),User.newUser);

router.put('/CalsPassword',passport.authenticate('jwt',{session : false}),User.setCalsPass);


// showing contents

router.get('/images',passport.authenticate('jwt',{session : false}),User.Images);
router.get('/image/:name',User.Image);
router.get('/musics',passport.authenticate('jwt',{session : false}),User.Musics);
router.get('/music/:name',User.Music);
router.get('/thumbnail/:name',User.Thumbnail);
router.get('/videos',passport.authenticate('jwt',{session : false}),User.videos);
router.get('/VideoOne/:name',User.VideoOne);
router.get('/documents',passport.authenticate('jwt',{session : false}),User.Documents);
router.get('/DocumentOne/:name',User.DocumentOne);






router.use('/upload',require('./uploads'));



module.exports = router;