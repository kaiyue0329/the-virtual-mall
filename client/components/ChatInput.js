import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import TextareaAutosize from 'react-autosize-textarea';

const ChatInput = ({ sendMessage, currentChat }) => {
  const [messageBody, setMessageBody] = React.useState('');

  const onSubmit = () => {
    sendMessage(currentChat, messageBody);
    setMessageBody('');
  };
  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <TextareaAutosize
        rows={2}
        style={{
          minWidth: '85%',
          resize: 'none',
          borderRadius: '12px',
          padding: '6px 10px',
          outline: 'none'
        }}
        value={messageBody}
        onChange={e => setMessageBody(e.target.value)}
      />
      <Button size="large" onClick={() => onSubmit()}>
        Submit
      </Button>
    </Container>
  );
};

export default ChatInput;
