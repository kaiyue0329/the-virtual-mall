const router = require('express').Router();
const Sequelize = require('sequelize');
const { Order, Product } = require('../db/models');
const Op = Sequelize.Op;

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id,
          status: {
            [Op.ne]: 'inCart',
          },
        },
        include: [{ model: Product }],
        order: [['dateOrdered', 'DESC']],
      });
      res.send(orders);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findOne({
        where: {
          id: req.params.orderId,
          userId: req.user.id,
          status: {
            [Op.ne]: 'inCart',
          },
        },
        include: [{ model: Product }],
      });
      res.send(orders);
    } else res.status(404).send();
  } catch (err) {
    next(err);
  }
});

router.put('/cancel/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (req.user.id === order.userId) {
      await order.update({
        status: 'cancelled',
      });
    }
    res.status(202).send('Order Cancelled');
  } catch (err) {
    next(err);
  }
});
