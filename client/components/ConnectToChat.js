import React from 'react';
import { Container, Divider, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const ConnectToChat = ({ connect, username, loginStatus }) => {
  return loginStatus ? (
    (connect(username), 'Connecting to chat...')
  ) : (
    <Container>
      <div style={{ color: 'grey', marginBottom: '1rem' }}>
        You have not logged in yet.
      </div>
      <Button
        primary
        content="Log In"
        icon="user"
        labelPosition="left"
        as={NavLink}
        exact
        to="/account"
      />
      <Divider horizontal>Or</Divider>
      <Button color="teal" content="Sign Up" icon="add" labelPosition="left" />
    </Container>
  );
};

export default ConnectToChat;
