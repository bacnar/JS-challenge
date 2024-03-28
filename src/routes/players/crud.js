const router = require('express').Router();
const controller = require('../../controllers/playersController');
const { body } = require('express-validator');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: The players managing API
 * /api/players:
 *   get:
 *     summary: Retrieve a list of players
 *     tags: [Players]
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
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: The created player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       500:
 *         description: Server error
 * /api/players/{id}:
 *   get:
 *     summary: Get the player by id
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The player id
 *     responses:
 *       200:
 *         description: The player response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: The player was not found
 *   put:
 *    summary: Update the player by the id
 *    tags: [Players]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The player id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Player'
 *    responses:
 *      204:
 *        description: The player was updated
 *      404:
 *        description: The player was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the player by id
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The player id
 *
 *     responses:
 *       204:
 *         description: The player was deleted
 *       404:
 *         description: The player was not found
 */

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.getAll);

router.get('/:id', validatorHandler, apicache.middleware('1 minute'), controller.getById);

router.post('/',
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('bornDate').notEmpty().isISO8601(),
  validatorHandler,
  controller.create);

router.put('/:id',
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('bornDate').notEmpty().isISO8601(),
  validatorHandler,
  controller.update);

router.delete('/:id', validatorHandler, controller.delete);

module.exports = router;
