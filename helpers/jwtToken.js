const jwt = require('jsonwebtoken');

/**
 * @param {Object} payload
 * @param {Object} options
 * @returns {String}
*/
module.exports.generate = function(payload, expiration = null){
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration || process.env.RESET_TOKEN_EXPIRATION });
}

module.exports.decode = function(token) {
    try {
        return jwt.decode(token);
    } catch(err) {
        throw err;
    }
}

module.exports.verify = function(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        throw err;
    }
}
