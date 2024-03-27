const router = require('express').Router();
const controller = require('../../controllers/gamesController');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.searchByQuery);

module.exports = router;
