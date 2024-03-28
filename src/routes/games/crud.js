const router = require('express').Router();
const controller = require('../../controllers/gamesController');
const { body } = require('express-validator');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: The games managing API
 * /api/games:
 *   get:
 *     summary: Retrieve a list of games
 *     tags: [Games]
 *     parameters:
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
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: The created game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       500:
 *         description: Server error
 * /api/games/{id}:
 *   get:
 *     summary: Get the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: The game response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: The game was not found
 *   put:
 *    summary: Update the game by the id
 *    tags: [Games]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The game id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Game'
 *    responses:
 *      204:
 *        description: The game was updated
 *      404:
 *        description: The game was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *
 *     responses:
 *       204:
 *         description: The game was deleted
 *       404:
 *         description: The game was not found
 */

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.getAll);

router.get('/:id', validatorHandler, apicache.middleware('1 minute'), controller.getById);

router.post('/',
  body('title').notEmpty(),
  body('description').notEmpty(),
  validatorHandler,
  controller.create);

router.put('/:id',
  body('title').notEmpty(),
  body('description').notEmpty(),
  validatorHandler,
  controller.update);

router.delete('/:id', validatorHandler, controller.delete);

module.exports = router;
