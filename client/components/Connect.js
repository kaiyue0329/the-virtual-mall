import React from 'react';
import { Container, Input, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Connect = ({ connect, username, loginStatus }) => {
  const [chatUsername, setChatUsername] = React.useState('');
  return loginStatus ? (
    (connect(username), 'Connecting to chat...')
  ) : (
    <Container>
      <div style={{ color: 'grey', marginBottom: '5px' }}>
        You have not logged in yet.
        <Button
          primary
          as={NavLink}
          exact
          to="/account"
          style={{ marginLeft: '6px' }}
        >
          Log in
        </Button>
      </div>
      <Input
        placeholder="Enter your name"
        value={chatUsername}
        onChange={e => setChatUsername(e.target.value)}
      />
      <Button
        style={{ marginLeft: '6px' }}
        onClick={() => connect(chatUsername)}
        disabled={!chatUsername}
      >
        Connect to Chat
      </Button>
    </Container>
  );
};

export default Connect;
