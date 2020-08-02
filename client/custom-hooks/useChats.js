import React from 'react';
import uuid from 'uuid';
import { getFromDatabase, saveToDatabase } from '../database';

const useChats = chatUsername => {
  const [currentChat, setCurrentChat] = React.useState(null);
  const [myActiveChats, setMyActiveChats] = React.useState([]);
  const [currentChatMessages, setCurrentChatMessages] = React.useState([]);

  React.useEffect(() => {
    getFromDatabase(`/${chatUsername}/chats`, res => {
      setMyActiveChats(Object.keys(res).reverse());
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

  const getCurrentDate = () => {
    let time = new Date();
    time = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
    return time.toISOString().substring(0, 11).replace(/[T]/g, '');
  };

  const createChat = (recepient, chatName) => {
    const fullChatName = `${getCurrentDate()}_${chatName}`;
    if (!myActiveChats.includes(fullChatName)) {
      saveToDatabase(`/${recepient}/chats/${fullChatName}`, fullChatName);
      saveToDatabase(`/${chatUsername}/chats/${fullChatName}`, fullChatName);
      saveToDatabase(`/chats/${fullChatName}/messages`, {});
    }
    setCurrentChat(fullChatName);
  };

  return {
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    currentChatMessages,
    setCurrentChat,
    getCurrentDate
  };
};

export default useChats;
