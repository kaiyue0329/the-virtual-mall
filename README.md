# The Virtual Mall

An e-commerce web application with a product catalog, cart, checkout, customer reviews, authentication, product searching and different product sorting options. Session persistence of the cart is also implemented for unauthenticated users. Customer support live chat implemented using React Hooks and Firebase Realtime Database.

**Demo:** https://youtu.be/8WrbguKxzbk

### Prerequisites

- PostgreSQL

## Getting Started

**Fork** and clone this repository. Then execute the following:

```bash
npm install
```

If postgres CLI tools installed, run `createdb the-virtual-mall-app` in terminal, or create a database in the postgres GUI with the name `the-virtual-mall-app`

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

## Built With

- [Node.js](https://nodejs.org/en/) - Javascript Environment
- [Express.js](https://expressjs.com/) - web framework used to setup server
- [React](https://https://reactjs.org/) - Front end framework for developing our web app
- [Redux.js](https://redux.js.org/) - state management
- [PostgreSQL](https://www.postgresql.org/) - SQL database used to store long term, relation user information
- [Sequelize](https://sequelize.org) - promise-based Node.js ORM for Postgres
- [Semantic UI React](https://react.semantic-ui.com/) - React integration for Semantic UI, a front-end development framework
- [Stripe](https://stripe.com) - APIs for payment processing
- [Firebase](https://firebase.google.com) - a cloud-hosted, NoSQL database

## License

This project is licensed under the MIT License.
