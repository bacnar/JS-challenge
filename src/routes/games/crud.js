const router = require('express').Router();
const controller = require('../../controllers/gamesController');
const { body } = require('express-validator');

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/',
  body('gameTitle').notEmpty(),
  body('description').notEmpty(),
  controller.create);

router.put('/:id',
  body('gameTitle').notEmpty(),
  body('description').notEmpty(),
  controller.update);

router.delete('/:id', controller.delete);

module.exports = router;
