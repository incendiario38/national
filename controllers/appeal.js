const User = require('../models').User;
const Disturbance = require('../models').Disturbance;
const Images = require('../models').Images;
const Appeal = require('../models').Appeal;

module.exports = {
    list(req, res) {
        return Appeal
            .findAll({
                include: [{
                    model: User,
                    as: 'user'
                }, {
                    model: Disturbance,
                    as: 'disturbance'
                }, {
                    model: Images,
                    as: 'images'
                }],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((appeals) => res.status(200).send(appeals))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    read(req, res) {
        return Appeal
            .findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'user'
                }, {
                    model: Disturbance,
                    as: 'disturbance'
                }, {
                    model: Images,
                    as: 'images'
                }],
            })
            .then((appeal) => {
                if (!appeal) {
                    return res.status(404).send({
                        message: 'Appeal Not Found',
                    });
                }
                return res.status(200).send(appeal);
            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return Appeal
            .create({
                disturbanceID: req.body.disturbanceID,
                dateTime: req.body.dateTime,
                coordinates: req.body.coordinates,
                numberCar: req.body.numberCar,
            })
            .then((appeal) => {
                appeal.linkAppeal = 'http://krsk.dev/';
                appeal.userID = req.body.userID;
                res.status(201).send(appeal)
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Appeal
            .findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'user'
                }, {
                    model: Disturbance,
                    as: 'disturbance'
                }, {
                    model: Images,
                    as: 'images'
                }],
            })
            .then(appeal => {
                if (!appeal) {
                    return res.status(404).send({
                        message: 'Appeal Not Found',
                    });
                }
                return appeal
                    .update({
                        disturbanceID: req.body.disturbanceID || appeal.disturbanceID,
                        userID: req.body.userID || appeal.userID,
                        dateTime: req.body.dateTime || appeal.dateTime,
                        coordinates: req.body.coordinates || appeal.coordinates,
                        numberCar: req.body.numberCar || appeal.numberCar,
                        status: req.body.status || appeal.status,
                        linkAppeal: req.body.linkAppeal || appeal.linkAppeal,
                    })
                    .then(() => res.status(200).send(appeal))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Appeal
            .findByPk(req.params.id)
            .then(appeal => {
                if (!appeal) {
                    return res.status(400).send({
                        message: 'Appeal Not Found',
                    });
                }
                return appeal
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};