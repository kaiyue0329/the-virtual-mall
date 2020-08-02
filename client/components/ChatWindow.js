import React from 'react';
import uuid from 'uuid';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

const ChatWindow = ({
  messages = [],
  sendMessage,
  currentChat,
  parseChatName,
  setCurrentChat
}) => {
  const [messageBody, setMessageBody] = React.useState('');

  // Sort messages into ascending order by the date they were created
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created).valueOf() - new Date(b.created).valueOf()
  );

  return (
    <div className="panel">
      {parseChatName(currentChat)}
      <Button onClick={() => setCurrentChat(null)}>Back</Button>
      <div className="messages">
        {messages.length > 0 &&
          sortedMessages.map(message => (
            <p key={uuid()}>
              {message.sender}: {message.body}
            </p>
          ))}
      </div>
      <div className="send-message">
        <textarea
          value={messageBody}
          onChange={e => setMessageBody(e.target.value)}
          className="text-entry"
        />
        <button
          type="button"
          className="submit"
          onClick={() => sendMessage(currentChat, messageBody)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
