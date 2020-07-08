const router = require('express').Router();

const { Review } = require('../db/models');

router.post('/:id', async (req, res, next) => {
  console.log('hit route================================');
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    console.log(productId);
    const star = req.body.star;
    const text = req.body.review;
    await Review.create({ star, text, productId, userId });
    res.json('');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
