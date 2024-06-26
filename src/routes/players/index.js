const router = require('express').Router({ mergeParams: true });
const gameplay = require('./games/index');
const search = require('./search');
const crud = require('./crud');

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - bornDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the player
 *         firstName:
 *           type: string
 *           description: First name of player
 *         lastName:
 *           type: string
 *           description: Last name of player
 *         bornDate:
 *           type: string
 *           format: date
 *           description: Born date of player
 */

router.use('/search', search);
router.use('/:playerId/games', gameplay);
router.use('', crud);

module.exports = router;
