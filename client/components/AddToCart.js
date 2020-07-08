import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { updateCartThunk } from '../store/cart';

class DisconnectedAddToCart extends React.Component {
  render() {
    this.props.orderProducts.orderId = this.props.cart.id;

    return (
      <Button
        animated
        onClick={() => {
          this.props.addToCart(this.props.orderProducts);
        }}
      >
        <Button.Content hidden>
          <Icon name="shop" />
        </Button.Content>
        <Button.Content visible>
          {this.props.buyItAgain ? 'Buy it Again' : 'Add to Cart'}
        </Button.Content>
      </Button>
    );
  }
}

const mapState = state => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = dispatch => {
  return {
    addToCart: cart => dispatch(updateCartThunk(cart)),
  };
};

export default connect(mapState, mapDispatch)(DisconnectedAddToCart);
