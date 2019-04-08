let express = require('express');
let router = express.Router();
const userController = require('../controllers/user');
const disturbanceController = require('../controllers/disturbance');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* User */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getByID);
router.post('/api/user/create', userController.create);
router.put('/api/user/:id/update', userController.update);
router.delete('/api/user/:id/delete', userController.delete);

/* Disturbance */
router.get('/api/disturbance', disturbanceController.list);
router.get('/api/disturbance/:id', disturbanceController.getByID);
router.post('/api/disturbance', disturbanceController.add);
router.put('/api/disturbance/:id', disturbanceController.update);
router.delete('/api/disturbance/:id', disturbanceController.delete);


module.exports = router;