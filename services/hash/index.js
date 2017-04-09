var bcrypt = require('bcrypt');
const saltRounds = 3;

module.exports = {
    hash: function (plain) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plain, saltRounds, function(err, hash) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(hash);
                }
            });
        })
    },
    verify: function(plain, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plain, hash, function(err, res) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(res);
                }
            });
        })
    }
}


