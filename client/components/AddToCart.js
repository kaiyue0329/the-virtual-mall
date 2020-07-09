import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { updateCartThunk } from '../store/cart';

class DisconnectedAddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  addItemToCart = async () => {
    this.setState({ loading: true });
    await this.props.addToCart(this.props.orderProducts);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 150);
  };

  render() {
    this.props.orderProducts.orderId = this.props.cart.id;
    const { loading } = this.state;

    return (
      <Button primary loading={loading} onClick={this.addItemToCart}>
        Add to Cart
      </Button>
    );
  }
}

const mapState = state => {
  return {
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    addToCart: cart => dispatch(updateCartThunk(cart))
  };
};

export default connect(mapState, mapDispatch)(DisconnectedAddToCart);
