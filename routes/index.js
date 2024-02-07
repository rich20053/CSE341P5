const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));

module.exports = router;