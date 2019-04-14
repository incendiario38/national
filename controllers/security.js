let crypto = require('crypto');
let models = require('../models');

module.exports = {
    login(req, res) {
        return models.User
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

                return models.Token
                    .create({
                        UserId: user.id,
                        token: token
                    })
                    .then((token) => {
                        if (!token) {
                            return res.status(400).send({
                                success: false,
                                message: 'Authentication failed. Token not created.'
                            });
                        }

                        return res.status(200).send({
                            success: true,
                            token: token.token
                        });
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};