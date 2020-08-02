import React from 'react';
import { Button } from 'semantic-ui-react';

const CreateChat = ({ createChat, rep, chatUsername }) => {
  const createChatWithRep = repNumber => {
    const recepient = repNumber.replace(/\s+/g, '');
    createChat(recepient, `${recepient}_${chatUsername}`);
  };

  return (
    <Button
      primary
      style={{ marginTop: '1rem' }}
      onClick={() => createChatWithRep(rep)}
    >
      Chat
    </Button>
  );
};

export default CreateChat;
