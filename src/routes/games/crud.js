const router = require('express').Router();
const controller = require('../../controllers/gamesController');
const { body } = require('express-validator');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.getAll);

router.get('/:id', validatorHandler, apicache.middleware('1 minute'), controller.getById);

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
