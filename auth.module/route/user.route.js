const express = require('express');
const router = express.Router();

const { register,
    login,
    forgetPassword,
    resetPassword,
    getUserLocationMeta
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);
router.get('/user-meta/:countryCode', getUserLocationMeta);

module.exports = router;
