const router = require('express').Router();
const crud = require('./crud');

/**
 * @swagger
 * components:
 *   schemas:
 *     Gameplay:
 *       type: object
 *       required:
 *         - onGameEnded
 *         - gameId
 *         - playerId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the gameplay
 *         gameId:
 *           type: string
 *           description: The id of game
 *         playerId:
 *           type: string
 *           description: The id of player
 *         onGameEnded:
 *           type: string
 *           format: date
 *           description: The auto-generated date of the gameplay
 */

router.use('', crud);

module.exports = router;
