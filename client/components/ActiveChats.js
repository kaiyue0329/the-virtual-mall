import React from 'react';

const ActiveChats = ({
  myActiveChats,
  setCurrentChat,
  parseChatName,
  createdToday
}) => {
  return (
    <div className="panel">
      <h3>Your Chat with</h3>
      {myActiveChats.map(chat => (
        <div
          key={chat}
          style={{
            cursor: 'pointer',
            color: `${createdToday(chat) ? '#2185D0' : 'black'}`
          }}
          onClick={() => setCurrentChat(chat)}
        >
          {parseChatName(chat)}
        </div>
      ))}
    </div>
  );
};

export default ActiveChats;
