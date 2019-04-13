let express = require('express');
let router = express.Router();

const securityController = require('../controllers/security');

router.post('/login', securityController.login);

module.exports = router;