const router = require('express').Router();

const games = require('./games/index');
const players = require('./players/index');

router.use('/games', games);
router.use('/players', players);

module.exports = router;
