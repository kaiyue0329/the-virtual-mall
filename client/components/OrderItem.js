import React from 'react';
import { OrderProduct } from '../components';
import { cancelOrderThunk } from '../store/orders';
import { connect } from 'react-redux';
import { Item, Segment, Grid, Button } from 'semantic-ui-react';
import moment from 'moment';

export const OrderItem = props => {
  const order = props.order;
  return (
    <Segment.Group>
      <Segment>
        <Grid columns={4}>
          <Grid.Column>
            <h3>
              Order Placed: {moment(order.dateOrdered).format('MMMM Do YYYY')}
            </h3>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h3>
              Status:{' '}
              {order.status &&
                order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </h3>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h3>Total Price: ${order.totalPrice / 100}</h3>
          </Grid.Column>
          <Grid.Column textAlign="right">
            {order.status !== 'cancelled' && props.orderConfirmation !== true && (
              <Button
                color="red"
                size="tiny"
                onClick={() => props.cancelOrder(order.id)}
              >
                Cancel Order
              </Button>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Item.Group>
          {order.products &&
            order.products.map(item => {
              return <OrderProduct product={item} key={item.id} />;
            })}
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

const mapDispatch = dispatch => ({
  cancelOrder: orderId => dispatch(cancelOrderThunk(orderId))
});

export default connect(null, mapDispatch)(OrderItem);
