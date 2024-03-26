const router = require('express').Router();
const search = require('./search');
const crud = require('./crud');

router.use('/search', search);
router.use('', crud);

module.exports = router;
