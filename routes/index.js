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

// Метод отвечающий за авторизацию пользователя и выдачу ему токена
router.post('/login', (req, res) => {
    usersRepository
    // Поиск пользователя по электронной почте
        .findByEmail(req.body.email.toLowerCase())
        .then((user) => {
            // Если пользователь не найден, то возвращаем ошибку 404
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            }

            // Если пароль введённый пользователем не верен, то возвращаем ошибку
            if (!user.authenticate(req.body.password)) {
                return res.status(400).send({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            }

            // Генерируем токен
            let token = crypto.randomBytes(128).toString('hex');

            // Создаем запись в базе данных с информацией о токене
            return models.Token
                .create({
                    // Указываем кому пренадлежит токен
                    userId: user.id,
                    // Указываем сгенерированный токен
                    token: token
                })
                .then((token) => {
                    // Возвращаем сообщение об успешной авторизации с токеном
                    return res.status(200).send({
                        success: true,
                        token: token.token
                    });
                })
                // В случае ошибок создания возвращаем ошибку 400
                .catch((error) => res.status(400).send(error));
        })
        // В случае ошибок - возвращаем ошибку 400
        .catch((error) => res.status(400).send(error));
});

module.exports = router;