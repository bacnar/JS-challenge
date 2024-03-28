const router = require('express').Router();
const controller = require('../../../controllers/playersController');
const validatorHandler = require('../../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * components:
 *   schemas:
 *     GamesPlayed:
 *       allOf:
 *         - $ref: '#/components/schemas/Player'
 *         - type: object
 *           properties:
 *             games:
 *               description: Games played
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Game'
 *                   - type: object
 *                     properties:
 *                       onGameEnded:
 *                         type: string
 *                         description: When game was ended
 *
 * /api/players/{playerId}/games:
 *   get:
 *     summary: Get the player by id with gameplays included
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: playerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The player id
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: string
 *         required: false
 *         description: Size of page
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: string
 *         required: false
 *         description: Number of page
 *     responses:
 *       200:
 *         description: The player response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GamesPlayed'
 *       404:
 *         description: The player was not found
 */

router.get('/', validatorHandler, apicache.middleware('1 second'), controller.getAllIncludeGameplay);

module.exports = router;
