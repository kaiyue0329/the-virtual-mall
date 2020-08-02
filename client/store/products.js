import axios from 'axios';
import history from '../history';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_RECOMMENDED_PRODUCTS = 'SET_RECOMMENDED_PRODUCTS';

export const setProducts = (products, pages) => {
  return { type: SET_PRODUCTS, products, pages };
};

export const fetchProductsThunk = (page, category, sortBy, searchQuery) => {
  return async dispatch => {
    if (!page) page = 1;

    let queryString = `?page=${page}`;

    if (category) {
      queryString += `&category=${category}`;
    }
    if (sortBy) {
      queryString += `&sortBy=${sortBy.toLowerCase()}`;
    }
    if (searchQuery) {
      queryString += `&searchBy=${searchQuery}`;
    }
    const response = await axios.get(`/api/products${queryString}`);
    const products = response.data.results;
    const pages = response.data.pages;
    dispatch(setProducts(products, pages));
    if (history.location.pathname === '/products') {
      history.push(`/products${queryString}`);
    }
  };
};

export default (products = {}, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { items: action.products, pages: action.pages };
    default:
      return products;
  }
};
