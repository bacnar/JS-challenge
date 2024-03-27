const router = require('express').Router();
const controller = require('../../../controllers/playersController');
const validatorHandler = require('../../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * /api/players/{playerId}/gameplays:
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
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: The player was not found
 */

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.getAllIncludeGameplay);

module.exports = router;
