const router = require('express').Router();
const search = require('./search');
const crud = require('./crud');

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the game
 *         title:
 *           type: string
 *           description: The title of game
 *         description:
 *           type: string
 *           description: Description of game
 */

router.use('/search', search);
router.use('', crud);

module.exports = router;
