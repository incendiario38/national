let express = require('express');
let router = express.Router();

let models = require('../models');

router.get('/', (req, res) => {
    return models.Disturbance
        .findAll({
            include: [{
                model: models.Appeal,
                as: 'appeals'
            }],
            order: [
                ['createdAt', 'DESC'],
                [{model: models.Appeal, as: 'appeals'}, 'createdAt', 'DESC'],
            ],
        })
        .then((disturbances) => res.status(200).send(disturbances))
        .catch((error) => {
            res.status(400).send(error);
        });
});

router.get('/:id', (req, res) => {
    return models.Disturbance
        .findByPk(req.params.id, {
            include: [{
                model: models.Appeal,
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
});

router.post('/create', (req, res) => {
    return models.Disturbance
        .create({
            kind: req.body.kind,
        })
        .then((disturbance) => res.status(201).send(disturbance))
        .catch((error) => res.status(400).send(error));
});

router.put('/:id/update', (req, res) => {
    return models.Disturbance
        .findByPk(req.params.id, {
            include: [{
                model: models.Appeal,
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
});

router.delete('/:id/delete', (req, res) => {
    return models.Disturbance
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
});

module.exports = router;
