import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'GET_ORDERS';
const CANCEL_ORDER = 'CANCEL_ORDER';
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({ type: SET_ORDERS, orders });

const cancelOrder = orderId => ({ type: CANCEL_ORDER, orderId });

const getSingleOrder = order => ({ type: GET_SINGLE_ORDER, order });

/**
 * THUNK CREATORS
 */
export const getOrders = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/order');
    if (data !== '') dispatch(setOrders(data));
    else {
      history.push('/cart/view');
    }
  } catch (err) {
    console.error(err);
  }
};

export const cancelOrderThunk = orderId => async dispatch => {
  try {
    await axios.put(`/api/order/cancel/${orderId}`);
    dispatch(cancelOrder(orderId));
  } catch (err) {
    console.error(err);
  }
};

export const getSingleOrderThunk = orderId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/order/${orderId}`);
    if (data) dispatch(getSingleOrder(data));
    else {
      history.push('/cart/view');
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case SET_ORDERS: {
      return action.orders;
    }
    case CANCEL_ORDER: {
      const newState = [...state];
      return newState.map(order => {
        if (order.id === action.orderId) {
          let newOrder = { ...order };
          newOrder.status = 'cancelled';
          return newOrder;
        } else return order;
      });
    }
    case GET_SINGLE_ORDER: {
      return action.order;
    }
    default:
      return state;
  }
}
