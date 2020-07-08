import React from 'react';
import { Message, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const InvalidCartMessage = props => {
  return (
    <Container>
      <Message negative>
        <Message.Header>
          {props.empty
            ? 'Your Cart is Empty!'
            : "One of your products doesn't have enough stock!"}
        </Message.Header>
        {props.empty ? (
          <p>
            Please add <NavLink to="/products">products</NavLink> to your cart{' '}
          </p>
        ) : (
          <p>
            Please fix your <NavLink to="/cart/view">cart</NavLink> to checkout
          </p>
        )}
      </Message>
    </Container>
  );
};

export default InvalidCartMessage;
