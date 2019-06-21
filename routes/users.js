let express = require('express');
let router = express.Router();

let models = require('../models');

router.get('/', (req, res) => {
    return models.User
        .findAll({
            include: [{
                model: models.Appeal,
                as: 'appeals',
            }],
            order: [
                ['createdAt', 'DESC'],
                [{model: models.Appeal, as: 'appeals'}, 'createdAt', 'DESC'],
            ],
        })
        .then((user) => res.status(200).send(user))
        .catch((error) => {
            res.status(400).send(error);
        });
});

// Метод отвечающий за получение данных о пользователе по его ID
router.get('/:id', (req, res) => {
    return models.User
    // Поиск пользователя по ID
        .findByPk(req.params.id, {
            include: [{
                model: models.Appeal,
                as: 'appeals'
            }],
        })
        .then((user) => {
            // Если пользователь не найден, возвращаем ошибку 404
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            // Если пользователь найден, возвращаем статус 200 и предоставляем данные о пользователе
            return res.status(200).send(user);
        })
        // Если произошли ошибки, возвращаем ошибку 400
        .catch((error) => res.status(400).send(error));
});

// Метод отвечающий за создание нового пользователя
router.post('/create', (req, res) => {
    return models.User
        .create({
            // Задаём имя из запроса
            firstName: req.body.firstName.trim(),
            // Задаём фамилию из запроса
            lastName: req.body.lastName.trim(),
            // Задаём отчество из запроса
            patronymic: req.body.patronymic.trim(),
            // Задаём адрес электронной почты из запроса
            email: req.body.email.trim().toLowerCase(),
            // Задаём номер телефона из запроса
            phone: req.body.phone.trim(),
            // Задаём адрес проживания из запроса
            address: req.body.address.trim(),
            // Задаём почтовый индекс из запроса
            postcode: req.body.postcode.trim(),
            // Задаём пароль из запроса (хеширование пароля и создание соли реализованно в модели перед сохранением)
            password: req.body.password.trim()
        })
        // Если ошибок не произошло, возвращаем статус 201 и создаем новго пользователя
        .then((user) => res.status(201).send(user))
        // В случае ошибки создания возвращаем код ошибки 400
        .catch((error) => res.status(400).send(error));
});

// Метод отвечающий за изменение данных о пользователе
router.put('/:id/update', (req, res) => {
    return models.User
    // Поиск пользователя по его ID
        .findByPk(req.params.id, {
            include: [{
                model: models.Appeal,
                as: 'appeals'
            }],
        })
        .then(user => {
            // Если пользователя не найдет, возвращаем ошибку 404
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return user
                .update({
                    // Изменяем текущее имя на имя из запроса
                    firstName: req.body.firstName.trim() || user.firstName,
                    // Изменяем текущую фамилию на фамилию из запроса
                    lastName: req.body.lastName.trim() || user.lastName,
                    // Изменяем текущее отчество на отчество из запроса
                    patronymic: req.body.patronymic.trim() || user.patronymic,
                    // Изменяем текущий адрес электронной почты на адрес электронной почты из запроса
                    email: req.body.email.trim().toLowerCase() || user.email,
                    // Изменяем текущий номер телефона на номер телефона из запроса
                    phoneNumber: req.body.phoneNumber.trim() || user.phoneNumber,
                    // Изменяем текущий адрес проживания на адрес проживания из запроса
                    address: req.body.address.trim() || user.address,
                    // Изменяем текущий почтовый индекс на почтовый индекс из запроса
                    postcode: req.body.postcode.trim() || user.postcode,
                })
                // Если ошибок не произошло, возвращаем статус 200 и обновляем данные пользователя
                .then(() => res.status(200).send(user))
                // В случае ошибки создания возвращаем ошибку 400
                .catch((error) => res.status(400).send(error));
        })
        // В случае ошибки возвращаем ошибку 400
        .catch((error) => res.status(400).send(error));
});

router.delete('/:id/delete', (req, res) => {
    return models.User
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
});

module.exports = router;
