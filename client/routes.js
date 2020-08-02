import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CartList,
  Chat,
  Homepage,
  OrdersList,
  OrderConfirmation,
  Login,
  Signup
} from './components';
import SingleProduct from './components/SingleProduct';
import { me, fetchProductsThunk, fetchCategoriesThunk } from './store';
import AllProducts from './components/AllProducts';
import CheckoutForm from './components/CheckoutForm';
import ReviewForm from './components/ReviewForm';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, username } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/cart/view" component={CartList} />
        <Route exact path="/home" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/products" component={AllProducts} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Homepage} />
        <Route
          path="/support"
          component={() => (
            <Chat username={username} loginStatus={isLoggedIn} />
          )}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/checkout" component={CheckoutForm} />
            <Route
              path="/checkout/confirmation/:cartId"
              component={OrderConfirmation}
            />
            <Route path="/orders" component={OrdersList} />
            <Route path="/review/:id" component={ReviewForm} />
            <Route
              path="/support"
              component={() => <Chat username={username} status={isLoggedIn} />}
            />
          </Switch>
        )}
        {/* Displays our login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    username: state.user.username
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchProductsThunk());
      dispatch(fetchCategoriesThunk());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
