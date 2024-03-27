const router = require('express').Router();
const controller = require('../../controllers/playersController');
const { body } = require('express-validator');
const validatorHandler = require('../../middleware/validatorHandler');
const apicache = require('apicache');

router.get('/', validatorHandler, apicache.middleware('1 minute'), controller.getAll);

router.get('/:id', validatorHandler, apicache.middleware('1 minute'), controller.getById);

router.post('/',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('bornDate').notEmpty().isISO8601(),
  validatorHandler,
  controller.create);

router.put('/:id',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('bornDate').notEmpty().isISO8601(),
  validatorHandler,
  controller.update);

router.delete('/:id', validatorHandler, controller.delete);

module.exports = router;
