import { Container } from 'semantic-ui-react';
import { OrderItem } from '../components';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getSingleOrderThunk } from '../store/orders';

export class OrderConfirmation extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.cartId);
  }

  render() {
    return (
      <Container>
        <h1>Order Successful</h1>
        <h2>Order Summary:</h2>
        <OrderItem order={this.props.orders} orderConfirmation={true} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
});

const mapDispatch = dispatch => {
  return {
    getOrder: cartId => dispatch(getSingleOrderThunk(cartId)),
  };
};

export default connect(mapStateToProps, mapDispatch)(OrderConfirmation);
