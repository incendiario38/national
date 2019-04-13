let crypto = require('crypto');

const User = require('../models').User;

module.exports = {
    login(req, res) {
        return User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'Authentication failed. User not found.'
                    });
                }

                if (user.password !== req.body.password) {
                    return res.status(400).send({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }

                let token = crypto.randomBytes(128).toString('hex');

                //TODO: Добавить генерацию токена и создание записи в БД для данного пользователя

                return res.status(200).send({
                    success: true,
                    token: token
                });
            })
            .catch((error) => res.status(400).send(error));
    }
};