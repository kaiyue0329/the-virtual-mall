import React from 'react';
import moment from 'moment';
import uuid from 'uuid';
import {
  Container,
  Grid,
  Button,
  List,
  Image,
  Icon,
  Divider
} from 'semantic-ui-react';
import ChatInput from './ChatInput';

const ChatWindow = ({
  username,
  messages = [],
  sendMessage,
  setCurrentChat,
  currentChat,
  parseChatName
}) => {
  // Sort messages into ascending order by the date they were created
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created).valueOf() - new Date(b.created).valueOf()
  );

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView(false);
  };

  React.useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      <Grid container columns={3}>
        <Grid.Column textAlign="left">
          <Button animated onClick={() => setCurrentChat(null)}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column textAlign="center">
          <h3>{parseChatName(currentChat)[0]}</h3>
        </Grid.Column>
        <Grid.Column textAlign="right" verticalAlign="middle">
          <Icon name="save" size="big" style={{ cursor: 'pointer' }} />
        </Grid.Column>
      </Grid>
      <Divider />
      <List relaxed size="large" style={{ height: '545px', overflow: 'auto' }}>
        {messages.length > 0 &&
          sortedMessages.map(message => (
            <List.Item key={uuid()}>
              <Image
                avatar
                floated={message.sender === username ? 'right' : 'left'}
                src={`https://robohash.org/${message.sender}?size=100x100`}
              />
              <List.Content
                style={{
                  maxWidth: '55%',
                  padding: '0px',
                  textAlign: `${message.sender === username ? 'right' : 'left'}`
                }}
                floated={message.sender === username ? 'right' : 'left'}
              >
                <List.Header>
                  {message.sender}
                  <div style={{ color: 'rgba(0,0,0,.4)', fontSize: '12px' }}>
                    {moment.utc(message.created).local().format('MM-DD h:mm A')}
                  </div>
                </List.Header>
                <List.Description
                  style={{
                    color: '#000',
                    float: `${message.sender === username ? 'right' : 'left'}`
                  }}
                >
                  {message.body}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        <div ref={messagesEndRef} />
      </List>
      <ChatInput sendMessage={sendMessage} currentChat={currentChat} />
    </Container>
  );
};

export default ChatWindow;
