import React from 'react';
import { Container, List, Image, Icon } from 'semantic-ui-react';

const ActiveChats = ({
  myChatsInfo,
  setCurrentChat,
  currentChat,
  parseChatName,
  createdToday,
  removeChat
}) => {
  const renderChatInfo = (shortChatName, fullChatName) => {
    const chatInfo = parseChatName(fullChatName);
    const recipient = chatInfo[0];
    const dateCreated = chatInfo[1];

    return (
      <List.Item
        key={fullChatName}
        style={{
          backgroundColor: `${
            shortChatName === currentChat ? 'rgba(0,0,0,.03)' : ''
          }`
        }}
      >
        <Image
          avatar
          src={`https://robohash.org/${recipient}?size=100x100`}
          style={{
            cursor: 'pointer'
          }}
          onClick={() => setCurrentChat(shortChatName)}
        />
        <List.Content
          style={{
            cursor: 'pointer'
          }}
          onClick={() => setCurrentChat(shortChatName)}
        >
          <List.Header
            style={{
              color: `${createdToday(fullChatName) ? '#2185D0' : '#000'}`
            }}
          >
            {recipient}
          </List.Header>
          <span style={{ fontSize: '14px' }}>{dateCreated}</span>
        </List.Content>
        <List.Content
          floated="right"
          style={{ paddingTop: '3.5%', paddingRight: '5%', margin: '0' }}
        >
          <Icon
            name="delete"
            color="red"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => removeChat(shortChatName)}
          ></Icon>
        </List.Content>
      </List.Item>
    );
  };

  return (
    <Container textAlign="center">
      <h3 style={{ paddingBottom: '8px' }}>Your Chat</h3>
      <List relaxed size="large" style={{ height: '628px', overflow: 'auto' }}>
        {myChatsInfo.map(chat => renderChatInfo(chat[0], chat[1]))}
      </List>
    </Container>
  );
};

export default ActiveChats;
