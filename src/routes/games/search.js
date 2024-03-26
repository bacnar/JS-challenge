const router = require('express').Router();
const controller = require('../../controllers/gamesController');

router.get('/', controller.searchByQuery);

module.exports = router;
