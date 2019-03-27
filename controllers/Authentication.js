const authHelper = require('../helpers/authentication');
const User = require('../models/User');

module.exports = {
    signup: (req, res, next) => {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(422).send({error: 'You must provide email and password'});
        }

        User.findOne({email}, (err, existingUser) => {
            if (err) {
                return next(err);
            }

            // If a user with this email does exist, return an error.
            if (existingUser) {
                return res.status(422).send({error: 'Email address is in use'});
            }

            // In memory representation
            const user = new User({
                email,
                password
            });

            // Actually save the user
            user.save((err) => {
                if (err) {
                    return next(err);
                }

                // Return generated user token
                res.send({token: authHelper.generateUserToken(user)});
            })
        });
    },
    signin: (req, res, next) => {
        // By this time user's email and password was already authenticated
        // We just need to give them token
        res.send({token: authHelper.generateUserToken(req.user)});
    }
};