const router = require('express').Router();
require('../../secrets');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const uuid = require('uuid/v4');

const { User, ShippingAddress } = require('../db/models');

router.get('/', (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    if (sessionId && !req.user) {
      res.json(sessionId);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const address = await ShippingAddress.findOrCreate({
        where: { id: req.user.shippingAddressId }
      });
      const user = await User.findByPk(req.user.id);
      await user.update({
        shippingAddressId: address[0].dataValues.id
      });
      res.json(address);
    } else {
      res.json(null);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const uid = req.user.id;
      const id = req.user.shippingAddressId;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const streetAddress = req.body.streetAddress;
      const city = req.body.city;
      const zipCode = req.body.zipCode;
      const state = req.body.state;
      const country = req.body.country;
      await User.update({ firstName, lastName, email }, { where: { id: uid } });
      await ShippingAddress.update(
        { streetAddress, city, zipCode, state, country },
        { where: { id } }
      );
      res.json('');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/stripe', async (req, res) => {
  let error;
  let status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.amount,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
        shipping: {
          name: token.card.name,
          address: product.address
        }
      },
      {
        idempotency_key
      }
    );
    status = 'success';
  } catch (error) {
    console.error('Error:', error);
    status = 'failure';
  }

  res.json({ error, status });
});

module.exports = router;
