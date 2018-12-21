// more info: https://github.com/themikenicholson/passport-jwt

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// 'users' comes from model
const User = mongoose.model("users");
const keys = require("../config/keys");

const options = {};
// bearer token 'bears' on users.js jwt.sign's callback `res.json` object
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

// `passport` is parameter, which is passed as passport in server.js
// will only be used on protected routes, via passport
module.exports = passport => {
  // gives back jwt payload and `done`
  // payload from users.js when passwords match
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      // jwt_payload includes `iat`, or issued at date, as well as expiry date
      // based on the jwt.sign object `expiresIn` property value
      // findById is a mongoose method
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // `done` from above, which returns:
            // error and an object -- in this case, no error (null),
            // and return user object
            return done(null, user);
          }
          // else, still use `done` with no error but also no object returned
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
