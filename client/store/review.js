import axios from 'axios';

const UPDATE_REVIEWS = 'UPDATE_REVIEWS';

export const updateReviews = review => ({
  type: UPDATE_REVIEWS,
  review,
});

export const updateReviewThunk = (id, review) => async dispatch => {
  const { data } = await axios.post(`/api/review/${id}`, review);
  dispatch(updateReviews(data));
};

export function reviewReducer(review = '', action) {
  switch (action.type) {
    case UPDATE_REVIEWS:
      return action.review;
    default:
      return review;
  }
}
