const router = require('express').Router();
const controller = require('../../controllers/playersController');
const validatorHandler = require('../../middleware/validatorHandler');

router.get('/', validatorHandler, controller.searchByQuery);

module.exports = router;
