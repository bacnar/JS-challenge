const router = require('express').Router();

const games = require('./games/index');
const players = require('./players/index');
const gameplays = require('./gameplays/index');

router.use('/games', games);
router.use('/players', players);
router.use('/gameplays', gameplays);

module.exports = router;
