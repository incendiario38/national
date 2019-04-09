const Disturbance = require('../models').Disturbance;
const Appeal = require('../models').Appeal;

module.exports = {
    list(req, res) {
        return Disturbance
            .findAll({
                include: [{
                    model: Appeal,
                    as: 'appeals'
                }],
                order: [
                    ['createdAt', 'DESC'],
                    [{model: Appeal, as: 'appeals'}, 'createdAt', 'DESC'],
                ],
            })
            .then((disturbances) => res.status(200).send(disturbances))
            .catch((error) => {
                res.status(400).send(error);
            });
    },

    read(req, res) {
        return Disturbance
            .findByPk(req.params.id, {
                include: [{
                    model: Appeal,
                    as: 'appeals'
                }],
            })
            .then((disturbance) => {
                if (!disturbance) {
                    return res.status(404).send({
                        message: 'Disturbance Not Found',
                    });
                }
                return res.status(200).send(disturbance);
            })
            .catch((error) => res.status(400).send(error));
    },

    create(req, res) {
        return Disturbance
            .create({
                kind: req.body.kind,
            })
            .then((disturbance) => res.status(201).send(disturbance))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Disturbance
            .findByPk(req.params.id, {
                include: [{
                    model: Appeal,
                    as: 'appeals'
                }],
            })
            .then(disturbance => {
                if (!disturbance) {
                    return res.status(404).send({
                        message: 'Disturbance Not Found',
                    });
                }
                return disturbance
                    .update({
                        kind: req.body.kind || disturbance.kind,
                    })
                    .then(() => res.status(200).send(disturbance))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Disturbance
            .findByPk(req.params.id)
            .then(disturbance => {
                if (!disturbance) {
                    return res.status(400).send({
                        message: 'Disturbance Not Found',
                    });
                }
                return disturbance
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};