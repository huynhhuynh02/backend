import APP_CONFIG from '../config/application';

const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function myPassport(passport) {
  passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_CONFIG.JWT.secret,
      maxAge: '1d'
    },
    function callBack(jwtPayload, cb) {
      console.log('JWT check');
      console.log(jwtPayload);
      return cb(null, jwtPayload);
    }
  ));
};
