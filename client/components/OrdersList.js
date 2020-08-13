import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../store/orders';
import { OrderItem } from '../components';
import { Container, Header } from 'semantic-ui-react';

class OrdersList extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const orders = this.props.orders;
    return (
      <Container style={{ marginTop: '1rem' }}>
        <Header as="h1">Your Orders:</Header>
        <h2>You have {orders.length} orders</h2>
        {orders &&
          Array.isArray(orders) &&
          orders.map(order => <OrderItem key={order.id} order={order} />)}
      </Container>
    );
  }
}

const mapState = state => ({
  orders: state.orders
});

const mapDispatch = dispatch => ({
  getOrders: () => dispatch(getOrders())
});

export default connect(mapState, mapDispatch)(OrdersList);
