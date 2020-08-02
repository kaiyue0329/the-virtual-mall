import React from 'react';
import useAuth from '../custom-hooks/useAuth';
import useChats from '../custom-hooks/useChats';
import ChatWindow from './ChatWindow';
import AllReps from './AllReps';
import ActiveChats from './ActiveChats';
import Connect from './Connect';
import { Container, Header, Segment } from 'semantic-ui-react';

const Chat = ({ username, loginStatus }) => {
  const [chatUsername, connect] = useAuth();
  const {
    myActiveChats,
    setCurrentChat,
    createChat,
    sendMessage,
    currentChat,
    currentChatMessages,
    getCurrentDate
  } = useChats(chatUsername);

  const createdToday = chatName => {
    const today = getCurrentDate();
    const dateCreated = chatName.split('_')[0];
    if (today === dateCreated) {
      return true;
    }
    return false;
  };

  const parseChatName = chatName => {
    const info = chatName.split('_');
    const repName = info[1];
    if (createdToday(chatName)) {
      return `${repName} [created today]`;
    }
    const dateCreated = info[0];
    return `${repName} [created on ${dateCreated}]`;
  };

  return (
    <Container textAlign="center" style={{ marginTop: '1rem' }}>
      <Header as="h1">Customer Support</Header>
      <Container>
        {!chatUsername ? (
          <Connect
            connect={connect}
            username={username}
            loginStatus={loginStatus}
          />
        ) : (
          <>
            {myActiveChats.length > 0 && (
              <ActiveChats
                setCurrentChat={setCurrentChat}
                myActiveChats={myActiveChats}
                parseChatName={parseChatName}
                getCurrentDate={getCurrentDate}
                createdToday={createdToday}
              />
            )}
            {currentChat ? (
              <ChatWindow
                sendMessage={sendMessage}
                currentChat={currentChat}
                messages={currentChatMessages}
                setCurrentChat={setCurrentChat}
                parseChatName={parseChatName}
              />
            ) : myActiveChats ? (
              <AllReps createChat={createChat} chatUsername={chatUsername} />
            ) : (
              'Loading...'
            )}
          </>
        )}
      </Container>
    </Container>
  );
};

export default Chat;
