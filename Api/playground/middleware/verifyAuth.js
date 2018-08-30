var { OAuth2Client } = require('google-auth-library');
var config = require('../server.config');

var client = new OAuth2Client(config.google.clientId);

function verifyAuth() {
    return async function(req, res, next) {
        try {
            var token = req.headers['x-access-token'];
            var ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.google.clientId,
            });
            var payload = ticket.getPayload();
            req.body.userId = payload['sub'];
            next();
        }
        catch(err) {
            res.json({ 'message': 'Authentication error.' });
        }
    }
}

module.exports = verifyAuth;