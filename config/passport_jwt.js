let User = require('../models/user');
const passport = require('passport');

let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;





passport.use(new JwtStrategy({
    jwtFromRequest :  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "sanjay"
},async function(payload,done){
     
    let user = await User.findById(payload.user._id);
    
   

    if(user){
        return done(null,user);
    }else{
        return done(null,false);
    }
}));


module.exports = passport;
