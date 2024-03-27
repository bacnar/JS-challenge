const router = require('express').Router();
const controller = require('../../controllers/gameplaysController');
const { body } = require('express-validator');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * tags:
 *   name: Gameplays
 *   description: The gameplays managing API
 * /api/gameplays:
 *   get:
 *     summary: Retrieve a list of gameplays
 *     tags: [Gameplays]
 *     responses:
 *       200:
 *         description: A list of gameplays
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gameplay'
 *   post:
 *     summary: Create a new gameplay
 *     tags: [Gameplays]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gameplay'
 *     responses:
 *       200:
 *         description: The created gameplay.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gameplay'
 *       500:
 *         description: Server error
 * /api/gameplays/{id}:
 *   get:
 *     summary: Get the gameplay by id
 *     tags: [Gameplays]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gameplay id
 *     responses:
 *       200:
 *         description: The gameplay response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gameplay'
 *       404:
 *         description: The gameplay was not found
 *   put:
 *    summary: Update the gameplay by the id
 *    tags: [Gameplays]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The gameplay id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Gameplay'
 *    responses:
 *      204:
 *        description: The gameplay was updated
 *      404:
 *        description: The gameplay was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the gameplay by id
 *     tags: [Gameplays]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gameplay id
 *
 *     responses:
 *       204:
 *         description: The gameplay was deleted
 *       404:
 *         description: The gameplay was not found
 */

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.getAll);

router.get('/:id', validatorHandler, apicache.middleware('1 minute'), controller.getById);

router.post('/',
  body('gameId').notEmpty(),
  body('playerId').notEmpty(),
  validatorHandler,
  controller.create);

router.put('/:id',
  body('gameId').notEmpty(),
  body('playerId').notEmpty(),
  validatorHandler,
  controller.update);

router.delete('/:id', validatorHandler, controller.delete);

module.exports = router;
