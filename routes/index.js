let express = require('express');
let router = express.Router();

let crypto = require('crypto');
let models = require('../models');
let usersRepository = require('../data/usersRepository');

/* GET home page. */
router.get('/', function (req, res) {
    models.User.findAll().then(function (users) {
        res.render('index', {
            title: 'Express',
            users: users
        });
    });
});

/* GET login page. */
router.get('/login', function (req, res) {
    res.render('login', {
        title: 'Login',
    });
});

router.post('/login', (req, res) => {
    usersRepository
        .findByEmail(req.body.email)
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
                    userId: user.id,
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
});

module.exports = router;