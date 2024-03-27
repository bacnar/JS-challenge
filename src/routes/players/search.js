const router = require('express').Router();
const controller = require('../../controllers/playersController');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * /api/players/search:
 *   get:
 *     summary: Search for players
 *     tags: [Players]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Player id
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         required: false
 *         description: First name of player
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         required: false
 *         description: Last name of player
 *       - in: query
 *         name: bornDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Born date of player
 *     responses:
 *       200:
 *         description: A list of players with matching parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.searchByQuery);

module.exports = router;
