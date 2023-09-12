const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth.middleware');
const { addCategory, getAllCategories, getCategoryDetails, getAllCategoriesCount } = require('../controllers/category.controller');

router.post('/addCategory', auth, addCategory);
router.get('/allCategories', auth, getAllCategories);
// router.put('/update', updateCategoryDetails);
router.get('/allCategoriesCount', getAllCategoriesCount);
router.get('/:id', getCategoryDetails);

module.exports = router;