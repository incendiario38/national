const User = require('../models').User;
const Appeal = require('../models').Appeal;

module.exports = {
    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: Appeal,
                    as: 'appeals',
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Appeal, as: 'appeals'}, 'createdAt', 'DESC'],
                ],
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => {
                res.status(400).send(error);
            });
    },
    getByID(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: Appeal,
                    as: 'appeals'
                }],
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return User
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                patronymic: req.body.patronymic,
                email: req.body.email.toLowerCase(),
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                postcode: req.body.postcode,
                password: req.body.password
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User
            .findByPk(req.params.id, {
                include: [{
                    model: Appeal,
                    as: 'appeals'
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        firstName: req.body.firstName || user.firstName,
                        lastName: req.body.lastName || user.lastName,
                        patronymic: req.body.patronymic || user.patronymic,
                        email: req.body.email.toLowerCase() || user.email,
                        phoneNumber: req.body.phoneNumber || user.phoneNumber,
                        postcode: req.body.postcode || user.postcode,
                        password: req.body.password || user.password,
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};