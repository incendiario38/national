let express = require('express');
let router = express.Router();

const disturbanceController = require('../controllers/disturbance');

router.get('/', disturbanceController.list);
router.get('/:id', disturbanceController.read);
router.post('/create', disturbanceController.create);
router.put('/:id/update', disturbanceController.update);
router.delete('/:id/delete', disturbanceController.delete);

module.exports = router;
