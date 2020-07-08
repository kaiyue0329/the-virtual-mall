import React from 'react';
import AddToCart from './AddToCart';
import { NavLink } from 'react-router-dom';
import { Item, Header, Button, Container } from 'semantic-ui-react';
import history from '../history';

export const OrderProduct = props => {
  const product = props.product;

  const orderProducts = {
    quantity: product.order_product.quantity,
    productId: product.id,
    event: 'addProduct',
  };

  const handleClick = productId => {
    history.push(`/review/${productId}`);
  };

  return (
    <Item key={product.id}>
      <Item.Image size="small" src={product.picture} />
      <Item.Content>
        <Item.Header as={NavLink} to={`/products/${product.id}`}>
          {product.name}
        </Item.Header>
        <Item.Meta>{`Quantity: ${product.order_product.quantity}`}</Item.Meta>
        <Item.Description>
          <Header sub>
            Price:{' '}
            {props.context === 'orderSummary'
              ? `$${product.price / 100.0}`
              : `$${product.order_product.productPrice / 100.0}`}
          </Header>
          {props.context === 'orderSummary' ? (
            ''
          ) : (
            <Container>
              <AddToCart buyItAgain={true} orderProducts={orderProducts} />
              <Button onClick={() => handleClick(product.id)}>
                Write a Product Review
              </Button>
            </Container>
          )}
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default OrderProduct;
