const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local strategy (email, password)
const localStrategyOptions = {usernameField: 'email'};
const localStrategy = new LocalStrategy(localStrategyOptions, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        } else {
            // Compare passwords
            user.comparePasswords(password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }

                // User was found but passwords doesn't match
                if (!isMatch) {
                    return done(null, false)
                }

                // Passwords match, this user will be added by passport to request object
                // So we can conveniently work with it in next middlewares.
                return done(null, user);
            });
        }
    })
});

// Jwt strategy options (for authenticated requests)
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create Jwt strategy
const jwtLoginStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }

        // See if the user exists, if it does call done with it, otherwise call done with null
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

// Tell passport to use our strategies
passport.use(jwtLoginStrategy);
passport.use(localStrategy);