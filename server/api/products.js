const router = require('express').Router();
const Product = require('../db/models/product');
const Reviews = require('../db/models/review');
const Category = require('../db/models/category');
const Sequelize = require('sequelize');

// front-end routes: /products?page=1&category=jewels
// front-end routes: /products?page=2
// front-end routes: /products

router.get('/', async (req, res, next) => {
  const page = req.query.page || 1;
  const PAGE_SIZE = 12;
  const CATEGORY_FILTER = req.query.category;
  const SEARCH_FILTER = req.query.searchBy;
  const SORT_BY = req.query.sortBy || 'id';
  const OFFSET_VALUE = (page - 1) * PAGE_SIZE || 1;

  //create dynamic query
  const createQuery = () => {
    if (CATEGORY_FILTER) {
      var categoryQuery = {
        name: {
          [Sequelize.Op.in]: [CATEGORY_FILTER]
        }
      };
    }
    if (SEARCH_FILTER) {
      var searchQuery = {
        name: {
          [Sequelize.Op.iLike]: `%${SEARCH_FILTER}%`
        }
      };
    }
    return { searchQuery, categoryQuery };
  };
  const query = createQuery();

  try {
    //get number of pages
    const data = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          where: query.categoryQuery
        }
      ],
      where: query.searchQuery
    });
    const pages = Math.ceil(data.count / PAGE_SIZE);

    //get first page
    const results = await Product.findAll({
      include: [
        { model: Reviews },
        {
          model: Category,
          where: query.categoryQuery
        }
      ],
      where: query.searchQuery,
      order: [SORT_BY],
      limit: PAGE_SIZE,
      offset: OFFSET_VALUE
    });
    res.json({ results, pages });
  } catch (error) {
    next(error);
  }
});

router.get('/topRated', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Reviews }, { model: Category }]
    });
    console.log('top rate', products[0].dataValues);
    let recommendedProducts = [];
    products.map(product => {
      let total = 0;
      product.dataValues.reviews.map(review => {
        total += review.dataValues.star;
      });
      const avg = Math.floor(total / product.reviews.length);
      if (avg >= 4 && recommendedProducts.length < 6) {
        recommendedProducts.push(product);
      }
    });
    console.log('recommedned', recommendedProducts);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id, {
      include: [{ model: Reviews }, { model: Category }]
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
