/**
 * User Model
 */
const User = require('./models/user');

/**
 * Passport
 */
const passport = require('passport');

/**
 * Passport Strategy
 */
const LocalStrategy = require('passport-local').Strategy;
 
/**
 * Passport JWT
 */
const passportJWT = require("passport-jwt");

/**
 * JWT Passport Strategy
 */
const JWTStrategy = passportJWT.Strategy;

/**
 * JWT Passport ExtractJwt
 */
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * Create Local Strategy
 */
const setLocalStrategy = function (email, password, cb) {
    return User.findOne({ email: email, password: password }).then(user => {
        if (!user) return cb(null, false, { message: 'Incorrect email or password.' });
        return cb(null, user, { message: 'Logged In Successfully' });
    }).catch(err => cb(err));
};

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    setLocalStrategy
));

passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function (jwtPayLoad, cb){
            let data = {
                id: jwtPayLoad.id,
                name: jwtPayLoad.name,
                email: jwtPayLoad.email
            };
            cb(null, data);
        }
    )
);

module.exports = passport;
