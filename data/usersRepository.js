let models = require('../models');

let UsersRepository = {
    findByEmail: (email) => {
        return models.User.findOne({
            where: {
                email: email
            }
        });
    }
};

module.exports = UsersRepository;