const { validationResult } = require('express-validator');
const Plant = require('../models/Plant');
const { cloudinary } = require('../config/cloudinary');

const getPlants = async (req, res) => {
  try {
    const { category, search, sortBy, sortOrder, page = 1, limit = 12 } = req.query;

    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { nameHindi: { $regex: search, $options: 'i' } },
        { nameEnglish: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'price') {
      sort = { price: sortOrder === 'desc' ? -1 : 1 };
    } else if (sortBy === 'name') {
      sort = { nameEnglish: sortOrder === 'desc' ? -1 : 1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Plant.countDocuments(query);

    const plants = await Plant.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      plants,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getFeaturedPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ featured: true, stockStatus: 'in-stock' }).limit(8);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBestSellers = async (req, res) => {
  try {
    const plants = await Plant.find({ bestseller: true, stockStatus: 'in-stock' }).limit(8);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const plants = await Plant.find({ newArrival: true, stockStatus: 'in-stock' }).limit(8);
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createPlant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nameHindi, nameEnglish, category, price, description, stockStatus, featured, bestseller, newArrival } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const plant = await Plant.create({
      nameHindi,
      nameEnglish,
      category,
      price,
      image: req.file.path,
      imagePublicId: req.file.filename,
      description,
      stockStatus: stockStatus || 'in-stock',
      featured: featured === 'true' || featured === true,
      bestseller: bestseller === 'true' || bestseller === true,
      newArrival: newArrival === 'true' || newArrival === true,
    });

    res.status(201).json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePlant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      if (plant.imagePublicId) {
        await cloudinary.uploader.destroy(plant.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    if (updateData.featured !== undefined) updateData.featured = updateData.featured === 'true' || updateData.featured === true;
    if (updateData.bestseller !== undefined) updateData.bestseller = updateData.bestseller === 'true' || updateData.bestseller === true;
    if (updateData.newArrival !== undefined) updateData.newArrival = updateData.newArrival === 'true' || updateData.newArrival === true;

    plant = await Plant.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    if (plant.imagePublicId) {
      await cloudinary.uploader.destroy(plant.imagePublicId);
    }

    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plant removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Plant.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPlants,
  getPlant,
  getFeaturedPlants,
  getBestSellers,
  getNewArrivals,
  createPlant,
  updatePlant,
  deletePlant,
  getCategories,
};
