import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../store/cart';
import { CartItem } from '../components';
import { Item, Container, Message, Button } from 'semantic-ui-react';

const _ = require('lodash/lang');

class CartList extends React.Component {
  constructor() {
    super();
    this.state = {
      canCheckout: true,
    };
    this.notEnoughStock = this.notEnoughStock.bind(this);
    this.calculateSubtotal = this.calculateSubtotal.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    if (_.isEmpty(this.props.cart)) this.props.getCart();
  }

  componentDidUpdate() {
    const checkout = this.notEnoughStock();
    if (this.state.canCheckout !== checkout) {
      this.setState({
        canCheckout: checkout,
      });
    }
  }

  notEnoughStock() {
    const products = this.props.cart.products;
    let result = true;
    if (products) {
      products.forEach(item => {
        if (item.inventoryQuantity < item.order_product.quantity) {
          result = false;
        }
      });
    }
    return result;
  }

  calculateSubtotal() {
    let sum = 0;
    this.props.cart.products.forEach(item => {
      sum += item.price * item.order_product.quantity;
    });
    return sum;
  }

  handleCheckout() {
    this.props.history.push('/checkout');
  }

  render() {
    const products = this.props.cart.products;
    return (
      <Container>
        <h1>Your Cart {products && products.length === 0 ? 'Is Empty' : ''}</h1>
        {!this.state.canCheckout && (
          <Message negative>
            <Message.Header>
              One of your products doesn't have enough stock!
            </Message.Header>
            <p>Please update your cart to checkout</p>
          </Message>
        )}
        <Item.Group>
          {products &&
            products.map(item => {
              return (
                <CartItem item={item} cart={this.props.cart} key={item.id} />
              );
            })}
        </Item.Group>
        <h1>Subtotal: ${products && this.calculateSubtotal() / 100}</h1>
        <Button
          color="green"
          disabled={
            !this.state.canCheckout || (products && products.length === 0)
          }
          onClick={this.handleCheckout}
        >
          Checkout
        </Button>
      </Container>
    );
  }
}

const mapState = state => ({
  cart: state.cart,
});

const mapDispatch = dispatch => ({
  getCart: () => dispatch(getCart()),
});

export default connect(mapState, mapDispatch)(CartList);
