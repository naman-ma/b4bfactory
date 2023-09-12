const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { addService, allPlatforms, updatePlatformStatus } = require('./controllers/superAdmin.controller');


router.get('/allPlatforms', auth, allPlatforms);
router.put('/updatePlatformStatus', auth, updatePlatformStatus);
router.post('/addService', auth, addService);

module.exports = router;
