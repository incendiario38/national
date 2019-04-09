let express = require('express');
let router = express.Router();

const appealController = require('../controllers/appeal');

router.get('/', appealController.list);
router.get('/:id', appealController.read);
router.post('/create', appealController.create);
router.put('/:id/update', appealController.update);
router.delete('/:id/delete', appealController.delete);

module.exports = router;
