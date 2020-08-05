import React from 'react';
import moment from 'moment';
import useAuth from '../custom-hooks/useAuth';
import useChats from '../custom-hooks/useChats';
import ChatWindow from './ChatWindow';
import AllReps from './AllReps';
import ActiveChats from './ActiveChats';
import ConnectToChat from './ConnectToChat';
import { Container, Grid } from 'semantic-ui-react';

const Chat = ({ username, loginStatus }) => {
  const [chatUsername, connect] = useAuth();
  const {
    myActiveChats,
    myChatsInfo,
    setCurrentChat,
    createChat,
    removeChat,
    sendMessage,
    currentChat,
    currentChatMessages
  } = useChats(chatUsername);

  const reps = [
    'Representative1',
    'Representative2',
    'Representative3',
    'Representative4',
    'Representative5',
    'Representative6'
  ];

  const createdToday = fullChatName => {
    const today = moment().format('YYYYMMDD');
    const dateCreated = moment
      .utc(fullChatName.split('_')[0])
      .local()
      .format('YYYYMMDD');
    if (today === dateCreated) {
      return true;
    }
    return false;
  };

  const parseChatName = fullChatName => {
    const info = fullChatName.split('_');
    const recipient = reps.includes(username) ? info[2] : info[1];
    const timeCreated = moment.utc(info[0]).local().format();
    const relativeTime = moment(timeCreated).fromNow();
    if (relativeTime === 'a few seconds ago') {
      return [recipient, 'Created just now'];
    }
    return [recipient, `Created ${relativeTime}`];
  };

  return (
    <Container textAlign="center" style={{ marginTop: '1rem' }}>
      {!chatUsername ? (
        <ConnectToChat
          connect={connect}
          username={username}
          loginStatus={loginStatus}
        />
      ) : (
        <Grid container columns={2} centered divided>
          {myActiveChats.length > 0 && (
            <Grid.Column width={4}>
              <ActiveChats
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                myActiveChats={myActiveChats}
                myChatsInfo={myChatsInfo}
                parseChatName={parseChatName}
                createdToday={createdToday}
                removeChat={removeChat}
              />
            </Grid.Column>
          )}
          <Grid.Column width={11}>
            {currentChat ? (
              <ChatWindow
                username={username}
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
          </Grid.Column>
        </Grid>
      )}
    </Container>
  );
};

export default Chat;
