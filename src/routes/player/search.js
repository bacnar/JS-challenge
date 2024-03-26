const router = require('express').Router();
const controller = require('../../controllers/player.controller');

router.get('/', controller.searchByQuery);

module.exports = router;
