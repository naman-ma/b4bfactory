const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth.middleware');
const { getUserDetails,
  getAllUsers,
  updateUserDetails,
  sendWarningMail,
  getAllUsersCount } = require('../controllers/user.controller');

router.get('/allUsers', auth, getAllUsers);
router.put('/update', auth, updateUserDetails);
router.post('/warning-email', sendWarningMail);
router.get('/allUsersCount', getAllUsersCount);
router.get('/:id', auth, getUserDetails);

module.exports = router;
