const router = require('express').Router();
const { Review } = require('../db/models');

router.post('/:id', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const star = req.body.star;
    const text = req.body.review;
    await Review.create({ star, text, productId, userId });
    res.json('');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
