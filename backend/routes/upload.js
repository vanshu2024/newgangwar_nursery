const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { storage } = require('../config/cloudinary');
const { uploadImage, deleteImage } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), uploadImage);
router.delete('/', protect, deleteImage);

module.exports = router;
