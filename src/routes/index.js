const router = require('express').Router();

const games = require('./game/index');
const player = require('./player/index');

router.use('/game', games);
router.use('/player', player);

module.exports = router;
