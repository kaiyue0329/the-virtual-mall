const router = require('express').Router();
const { Order, Product, orderProduct } = require('../db/models');

module.exports = router;

const findOrCreateCart = async req => {
  try {
    if (req.user) {
      const cart = await Order.findOrCreate({
        where: { userId: req.user.id, status: 'inCart' },
        include: [{ model: Product }],
      });
      return cart[0].dataValues;
    } else {
      const cart = await Order.findOrCreate({
        where: { sessionId: req.sessionID, status: 'inCart' },
        include: [{ model: Product }],
      });
      return cart[0].dataValues;
    }
  } catch (err) {
    console.log(err);
  }
};

// Initial get cart method
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      try {
        const order = await Order.findOne({
          where: { userId: req.user.id, status: 'inCart' },
          include: [{ model: Product }],
        });
        res.send(order);
      } catch (err) {
        next(err);
      }
    } else {
      const order = await Order.findOne({
        where: { sessionId: req.sessionID, status: 'inCart' },
        include: [{ model: Product }],
      });
      res.send(order);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/merge', async (req, res, next) => {
  try {
    const sessionCart = await Order.findOne({
      where: { sessionId: req.sessionID, status: 'inCart' },
      include: [{ model: Product }],
    });

    //USER CART - store just the product ID and quantity in an object
    const userCart = await findOrCreateCart(req);
    let userProducts = [];
    userCart.products.map(product =>
      userProducts.push({
        id: product.order_product.dataValues.productId,
        quantity: product.order_product.dataValues.quantity,
      })
    );
    const userProductIds = userProducts.map(product => product.id);

    if (sessionCart) {
      //if there is a session cart without a user id
      if (!sessionCart.dataValues.userId) {
        let sessionProducts = [];

        if (sessionCart.dataValues.products.length) {
          //SESSION CART - store just the product ID and quantity in an object
          sessionCart.dataValues.products.map(product =>
            sessionProducts.push({
              id: product.order_product.dataValues.productId,
              quantity: product.order_product.dataValues.quantity,
            })
          );

          //check the session products
          await Promise.all(
            sessionProducts.map(async product => {
              //if the session product isn't in the user products, create it on the user cart
              if (!userProductIds.includes(product.id)) {
                await orderProduct.create({
                  quantity: product.quantity,
                  orderId: userCart.id,
                  productId: product.id,
                });

                //else if the quantity from the session is different from the quantity of the user cart, add them together
              } else if (
                userProducts.find(item => item.id === product.id).quantity !==
                product.quantity
              ) {
                const productToUpdate = await orderProduct.findOne({
                  where: { orderId: userCart.id, productId: product.id },
                });
                await productToUpdate.update({
                  quantity:
                    userProducts.find(item => item.id === product.id).quantity +
                    product.quantity,
                });
              }
            })
          );
        }
      }
      //return the updated cart
      const newCart = await Order.findByPk(userCart.id, {
        include: [{ model: Product }],
      });
      res.send(newCart);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await findOrCreateCart(req);
    const productThrough = await orderProduct.findOne({
      where: { orderId: cart.id, productId: req.body.productId },
    });
    if (req.body.event === 'addProduct') {
      if (productThrough) {
        await productThrough.update({
          quantity: (productThrough.quantity += req.body.quantity),
        });
      } else {
        await orderProduct.create({
          quantity: req.body.quantity,
          orderId: cart.id,
          productId: req.body.productId,
        });
      }
    }
    if (req.body.event === 'updateQuantity') {
      await productThrough.update({
        quantity: req.body.quantity,
      });
    }
    if (req.body.event === 'deleteItem') {
      await productThrough.destroy();
    }
    const newCart = await Order.findByPk(cart.id, {
      include: [{ model: Product }],
    });
    res.send(newCart);
  } catch (err) {
    next(err);
  }
});

// does all the checkout work
router.put('/checkout/:cartId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { id: req.params.cartId },
      include: [{ model: Product }],
    });
    if (cart.status !== 'inCart') throw new Error('not a valid cart!');
    let price = 0;
    await Promise.all(
      cart.products.map(async item => {
        await item.order_product.update({
          productPrice: item.price,
        });
        const product = await Product.findByPk(item.id);
        await product.update({
          inventoryQuantity:
            product.inventoryQuantity - item.order_product.quantity,
        });
        price += item.price * item.order_product.quantity;
      })
    );
    await cart.update({
      totalPrice: price,
      status: 'created',
      dateOrdered: new Date(),
    });
    res.status(202).send('Order Placed!');
  } catch (err) {
    next(err);
  }
});
