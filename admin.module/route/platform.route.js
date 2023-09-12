const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth.middleware');
const { allSettings, addSetting, updateSetting } = require('../controllers/platform.controller');

router.get('/allSettings', allSettings);
router.post('/addSetting', auth, addSetting);
router.put('/updateSetting', auth, updateSetting);

module.exports = router;