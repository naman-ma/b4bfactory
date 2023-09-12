const express = require('express');
const router = express.Router();

router.use('/user', require('./user.route'));
router.use('/platform', require('./platform.route'));
router.use('/category', require('./category.route'));

module.exports = router;
