let db = require(global.__root + 'db');
let hashService = require('../hash');

module.exports = class User {
    static async getById(_id) {
        return await db.collection.findOne(db.entities.User, {_id: _id.toObjectId()});
    }

    static async register(data) {
        let user = db.entities.Entity.fromJSON(data, db.entities.User);
        await user.save();
        return user.src._id;
    }

    static async login(data) {
        let login = db.entities.Entity.fromJSON(data, db.entities.Login);
        let user = await db.collection.findOnePopulate(db.entities.User, {
            login: login.src.login 
        });
        if (!user) {
            throw new Error('login was not found');
        }

        let result = await user.verifyPassword(login.src.password);
        if (!result) {
            throw new Error('password doesn\'t match');
        }

        let token = await user.pushToken();
        return {
            userid: user.src._id,
            token: token 
        }
    }

    static async verifyToken (req) {
        let token = req.token;
        let userId = req.userid;

        if (!token || !userId) {

            return false;
        }
        
        let instance = await User.getById(userId);

        if (!instance) {

            return false;
        }

        let hashes = instance.tokens;

        let results = await hashes.mapAsync(hash => hashService.verify(token, hash));

        let result = results.find(_ => _);

        return result ? instance : null;
    }

    static async userInfo(_id) {
        
    }
}