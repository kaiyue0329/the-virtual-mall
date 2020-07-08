const router = require('express').Router();
const Category = require('../db/models/category');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
