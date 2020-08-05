import React from 'react';
import uuid from 'uuid';
import {
  getFromDatabase,
  saveToDatabase,
  removeFromDatabase
} from '../database';

const useChats = chatUsername => {
  const [currentChat, setCurrentChat] = React.useState(null);
  const [myActiveChats, setMyActiveChats] = React.useState([]);
  const [myChatsInfo, setMyChatsInfo] = React.useState([]);
  const [currentChatMessages, setCurrentChatMessages] = React.useState([]);

  React.useEffect(() => {
    getFromDatabase(`/${chatUsername}/chats`, res => {
      setMyActiveChats(Object.keys(res).reverse());
      setMyChatsInfo(Object.entries(res).reverse());
    });

    setCurrentChatMessages([]);
    getFromDatabase(`/chats/${currentChat}/messages`, res => {
      setCurrentChatMessages(Object.values(res));
    });
  }, [currentChat, chatUsername]);

  const sendMessage = (chatName, body) => {
    const messageId = uuid();
    saveToDatabase(`/chats/${chatName}/messages/${messageId}`, {
      body,
      sender: chatUsername,
      created: new Date().toISOString()
    });
  };

  const getCurrentTime = () => {
    return new Date().toISOString().substring(0, 19);
  };

  const createChat = (recepient, chatName) => {
    const shortChatName = `${getCurrentTime().substring(0, 10)}_${chatName}`;
    const fullChatName = `${getCurrentTime()}_${chatName}`;
    if (!myActiveChats.includes(shortChatName)) {
      saveToDatabase(`/${recepient}/chats/${shortChatName}`, fullChatName);
      saveToDatabase(`/${chatUsername}/chats/${shortChatName}`, fullChatName);
      const messageId = uuid();
      saveToDatabase(`/chats/${shortChatName}/messages/${messageId}`, {
        body: `Hi, I am ${recepient} from the Virtual Mall. Nice to meet you! Whom do I have the pleasure of chatting with today?`,
        sender: recepient,
        created: new Date().toISOString()
      });
    }
    setCurrentChat(shortChatName);
  };

  const removeChat = shortChatName => {
    // eslint-disable-next-line no-alert
    const selection = confirm('Are you sure you want to delete this chat?');

    if (selection) {
      myActiveChats.pop(shortChatName);
      if (myActiveChats.length === 0) {
        setMyActiveChats([]);
      }
      if (shortChatName === currentChat) {
        setCurrentChat(null);
      }

      const info = shortChatName.split('_');
      const rep = info[1];
      const user = info[2];
      removeFromDatabase(`${user}/chats/${shortChatName}`);
      removeFromDatabase(`/chats/${shortChatName}`);
      removeFromDatabase(`${rep}/chats/${shortChatName}`);
    }
  };

  return {
    sendMessage,
    createChat,
    removeChat,
    currentChat,
    myActiveChats,
    myChatsInfo,
    currentChatMessages,
    setCurrentChat
  };
};

export default useChats;
