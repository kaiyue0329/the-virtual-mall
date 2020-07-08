import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const PLACE_ORDER = 'PLACE_ORDER';
const MERGE_CART = 'MERGE_CART';

/**
 * INITIAL STATE
 */
const defaultCart = {};

/**
 * ACTION CREATORS
 */
const setCart = cart => ({ type: SET_CART, cart });
const updateCart = cart => ({ type: UPDATE_CART, cart });
const placeOrder = () => ({ type: PLACE_ORDER });
const mergeCart = cart => ({ type: MERGE_CART, cart });

/**
 * THUNK CREATORS
 */
export const mergeCartThunk = () => async dispatch => {
  const response = await axios.put(`/api/cart/merge`);
  dispatch(mergeCart(response.data));
};

export const getCart = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cart');
    if (data !== '') dispatch(setCart(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateCartThunk = cart => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/cart/${cart.orderId}`, cart);
      if (response.data !== '') dispatch(updateCart(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const placeOrderThunk = cart => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/checkout/${cart.id}`);
      dispatch(placeOrder());
      history.push(`/checkout/confirmation/${cart.id}`);
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case SET_CART: {
      return action.cart;
    }
    case UPDATE_CART: {
      return action.cart;
    }
    case PLACE_ORDER: {
      return {};
    }
    case MERGE_CART: {
      return action.cart;
    }
    default:
      return state;
  }
}
