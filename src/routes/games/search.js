const router = require('express').Router();
const controller = require('../../controllers/gamesController');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * /api/games/search:
 *   get:
 *     summary: Search for games
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Game id
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Title of game
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         required: false
 *         description: Description of game
 *     responses:
 *       200:
 *         description: A list of games with matching parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.searchByQuery);

module.exports = router;
