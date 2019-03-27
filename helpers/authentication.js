const jwt = require('jwt-simple');
const config = require('../config');

module.exports = {
   generateUserToken: ({id}) => {
       return jwt.encode({
           sub: id, // Sub stand for subject - who does this token belongs too?
           iat: new Date().getTime() // iat - issued at time
       }, config.secret);
   }
};
