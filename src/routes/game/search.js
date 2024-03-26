const router = require('express').Router();
const controller = require('../../controllers/game.controller');

router.get('/', controller.searchByQuery);

module.exports = router;
