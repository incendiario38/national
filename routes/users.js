let express = require('express');
let router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.list);
router.get('/:id', userController.getByID);
router.post('/create', userController.create);
router.put('/:id/update', userController.update);
router.delete('/:id/delete', userController.delete);

module.exports = router;
