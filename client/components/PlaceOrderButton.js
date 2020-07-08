import React from 'react';
import { connect } from 'react-redux';
import { placeOrderThunk } from '../store/cart';
import { Button } from 'semantic-ui-react';

export const PlaceOrderButton = props => {
  return (
    <Button color="green" onClick={() => props.placeOrder(props.cart)}>
      Place Order
    </Button>
  );
};

const mapState = state => ({
  cart: state.cart,
});

const mapDispatch = dispatch => ({
  placeOrder: cart => dispatch(placeOrderThunk(cart)),
});

export default connect(mapState, mapDispatch)(PlaceOrderButton);
