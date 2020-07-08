import React from 'react';
import { OrderProduct } from '../components';
import { cancelOrderThunk } from '../store/orders';
import { connect } from 'react-redux';
import { Item, Segment, Grid, Button } from 'semantic-ui-react';

export const OrderSummary = props => {
  const order = props.order;

  const calculateSubtotal = () => {
    let sum = 0;
    order.products.forEach(item => {
      sum += item.price * item.order_product.quantity;
    });
    return sum;
  };

  return (
    <Segment.Group>
      <Segment>
        <h1>Subtotal: {order.products && `$${calculateSubtotal() / 100}`}</h1>
      </Segment>
      <Segment>
        <Item.Group>
          {order.products &&
            order.products.map(item => {
              return (
                <OrderProduct
                  product={item}
                  key={item.id}
                  context="orderSummary"
                />
              );
            })}
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

const mapDispatch = dispatch => ({
  cancelOrder: orderId => dispatch(cancelOrderThunk(orderId)),
});

export default connect(null, mapDispatch)(OrderSummary);
