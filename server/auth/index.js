const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

const validateFormUser = (email, password) => {
  let errorMessageArray = [];

  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === '') {
    errorMessageArray.push('Email is required.');
  } else if (!re.test(email.toLowerCase())) {
    errorMessageArray.push('Invalid Email.');
  }
  if (password === '') {
    errorMessageArray.push('Password is required.');
  }

  return errorMessageArray;
};

router.post('/login', async (req, res, next) => {
  try {
    const errorMessageArray = validateFormUser(
      req.body.email,
      req.body.password
    );
    if (errorMessageArray.length > 0) {
      res.status(401).send(errorMessageArray.join('\n'));
    } else {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(401).send('Username does not exist');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Wrong username and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const errorMessageArray = validateFormUser(
      req.body.email,
      req.body.password
    );
    if (errorMessageArray.length > 0) {
      res.status(401).send(errorMessageArray.join(''));
    } else {
      const user = await User.create({
        ...req.body,
        username: req.body.email.split('@')[0],
        profilePicture: `https://robohash.org/${req.body.email}`
      });
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});
