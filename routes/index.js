let User = require('../models').User;
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    User.findAll().then(function (users) {
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

router.post('/login', require('../controllers/security').login);

module.exports = router;