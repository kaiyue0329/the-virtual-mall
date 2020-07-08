import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateCartThunk } from '../store/cart';
import { Item, Dropdown, Message, Header, Button } from 'semantic-ui-react';

export const CartItem = props => {
  const updateQuantity = (num, item) => {
    const orderProduct = {
      quantity: num,
      productId: item.id,
      orderId: props.cart.id,
      event: 'updateQuantity',
    };
    props.update(orderProduct);
  };

  const createDropdown = item => {
    let options = [];
    for (let i = 1; i < 11; i++) {
      options.push(
        <Dropdown.Item
          text={`${i}`}
          value={i}
          onClick={() => updateQuantity(i, item)}
          key={i}
        />
      );
    }
    return options;
  };

  const deleteProduct = item => {
    const orderProduct = {
      productId: item.id,
      orderId: props.cart.id,
      event: 'deleteItem',
    };
    props.update(orderProduct);
  };

  const item = props.item;

  return (
    <Item>
      <Item.Image size="small" src={item.picture} />
      <Item.Content>
        <Item.Header as={NavLink} to={`/products/${item.id}`}>
          {item.name}
        </Item.Header>
        <Item.Meta>
          Stock: {item.inventoryQuantity}{' '}
          {item.inventoryQuantity < item.order_product.quantity ? (
            <Message size="mini" negative compact>
              Not enough in stock
            </Message>
          ) : (
            ''
          )}
        </Item.Meta>
        <Item.Description>
          <Header sub>Price: {`$${item.price / 100.0}`}</Header>
          Quantity:{' '}
          <Dropdown text={item.order_product.quantity.toString()}>
            <Dropdown.Menu>{createDropdown(item)}</Dropdown.Menu>
          </Dropdown>
          <Button
            style={{ marginLeft: '15px' }}
            color="red"
            onClick={() => deleteProduct(item)}
          >
            Delete Item
          </Button>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

const mapDispatch = dispatch => ({
  update: cart => dispatch(updateCartThunk(cart)),
});

export default connect(null, mapDispatch)(CartItem);
