import axios from 'axios';

const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';

export const setOneProduct = oneProduct => ({
  type: GET_ONE_PRODUCT,
  oneProduct
});

export const getOneProduct = id => async dispatch => {
  const { data: oneProduct } = await axios.get(`/api/products/${id}`);
  dispatch(setOneProduct(oneProduct));
};

const initialState = { oneProduct: '' };

export function oneProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return action.oneProduct;
    default:
      return state;
  }
}
