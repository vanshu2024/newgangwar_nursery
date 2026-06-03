const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { storage } = require('../config/cloudinary');
const multer = require('multer');
const {
  getPlants,
  getPlant,
  getFeaturedPlants,
  getBestSellers,
  getNewArrivals,
  createPlant,
  updatePlant,
  deletePlant,
  getCategories,
} = require('../controllers/plantController');

const router = express.Router();
const upload = multer({ storage });

router.get('/', getPlants);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedPlants);
router.get('/bestsellers', getBestSellers);
router.get('/new-arrivals', getNewArrivals);
router.get('/:id', getPlant);

router.post('/', protect, upload.single('image'), [
  body('nameHindi').trim().notEmpty().withMessage('Hindi name is required'),
  body('nameEnglish').trim().notEmpty().withMessage('English name is required'),
  body('category').isIn([
    'Indoor Plants', 'Outdoor Plants', 'Flowering Plants',
    'Fruit Plants', 'Medicinal Plants', 'Decorative Plants',
    'Bonsai Plants', 'Seasonal Plants', 'Shade Trees', 'Hedge Plants',
  ]).withMessage('Invalid category'),
  body('price').isNumeric().withMessage('Valid price is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
], createPlant);

router.put('/:id', protect, upload.single('image'), [
  body('nameHindi').optional().trim().notEmpty(),
  body('nameEnglish').optional().trim().notEmpty(),
  body('category').optional().isIn([
    'Indoor Plants', 'Outdoor Plants', 'Flowering Plants',
    'Fruit Plants', 'Medicinal Plants', 'Decorative Plants',
    'Bonsai Plants', 'Seasonal Plants', 'Shade Trees', 'Hedge Plants',
  ]),
  body('price').optional().isNumeric(),
], updatePlant);

router.delete('/:id', protect, deletePlant);

module.exports = router;
