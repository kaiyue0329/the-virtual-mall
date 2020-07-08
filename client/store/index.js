import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import { oneProductReducer } from './oneProduct';
import cart from './cart';
import products from './products';
import orders from './orders';
import { reviewReducer } from './review';

import categories from './categories';
import { checkoutReducer } from './checkout';

const reducer = combineReducers({
  user,
  products,
  cart,
  oneProduct: oneProductReducer,
  orders,
  categories,
  shippingAddress: checkoutReducer,
  review: reviewReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './categories';
