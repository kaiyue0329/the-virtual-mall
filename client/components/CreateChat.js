import React from 'react';
import { Button } from 'semantic-ui-react';

const CreateChat = ({ createChat, rep, chatUsername }) => {
  const createChatWithRep = repNumber => {
    createChat(repNumber, `${repNumber}_${chatUsername}`);
  };

  return (
    <Button
      primary
      style={{ marginTop: '0.5rem' }}
      onClick={() => createChatWithRep(rep)}
    >
      Chat
    </Button>
  );
};

export default CreateChat;
