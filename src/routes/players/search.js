const router = require('express').Router();
const controller = require('../../controllers/playersController');

router.get('/', controller.searchByQuery);

module.exports = router;
