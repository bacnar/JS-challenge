const router = require('express').Router();
const controller = require('../../controllers/gamesController');
const { body } = require('express-validator');
const validatorHandler = require('../../middleware/validatorHandler');

router.get('/', validatorHandler, controller.getAll);

router.get('/:id', validatorHandler, controller.getById);

router.post('/',
  body('gameTitle').notEmpty(),
  body('description').notEmpty(),
  validatorHandler,
  controller.create);

router.put('/:id',
  body('gameTitle').notEmpty(),
  body('description').notEmpty(),
  validatorHandler,
  controller.update);

router.delete('/:id', validatorHandler, controller.delete);

module.exports = router;
