import axios from 'axios';

const GET_SHIPPING_ADDRESS = 'GET_SHIPPING_ADDRESS';
const UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS';

export const getShippingAddress = address => ({
  type: GET_SHIPPING_ADDRESS,
  address,
});

export const changeShippingAddress = address => ({
  type: UPDATE_SHIPPING_ADDRESS,
  address,
});

export const fetchShippingAddress = () => async dispatch => {
  const { data: address } = await axios.get(`/api/checkout`);
  dispatch(getShippingAddress(address));
};

export const updateShippingAddress = address => async dispatch => {
  const { data } = await axios.put('/api/checkout', address);
  dispatch(changeShippingAddress(data));
};

export const stripeCheckout = (token, product) => async () => {
  try {
    const response = await axios.post('/api/checkout/stripe', {
      token,
      product,
    });
    const { status } = response.data;
    return status;
  } catch (err) {
    console.log(err);
  }
};

export function checkoutReducer(address = '', action) {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS:
      return action.address;
    case UPDATE_SHIPPING_ADDRESS:
      return action.address;
    default:
      return address;
  }
}
