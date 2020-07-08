import axios from 'axios';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = categories => {
  return { type: SET_CATEGORIES, categories };
};

export const fetchCategoriesThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/categories');
    const categories = response.data;
    dispatch(setCategories(categories));
  };
};

export default (categories = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
};
