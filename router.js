const AuthenticationController = require('./controllers/Authentication');
// TODO make it more clear that this require statement actually initializes passport strategies
const passportService = require('./services/passport');
const passport = require('passport');

// This strategy will require jwt token to be present in the headers of the request
const requireAuth = passport.authenticate('jwt', {session: false});

// This strategy requires correct email and password to be present in the body of the request
const requireSignin = passport.authenticate('local', {session: false});

module.exports = (app) => {
    app.get('/', requireAuth, (req, res) => {
        res.send({hi: 'there'});
    });
    app.post('/signin', requireSignin, AuthenticationController.signin);
    app.post('/signup', AuthenticationController.signup)
};