import React from 'react';
import { saveToDatabase } from '../database';

const useAuth = () => {
  const [chatUsername, setChatUsername] = React.useState(null);

  const connect = username => {
    saveToDatabase(`/users/${username}`, true);
    setChatUsername(username);
  };

  return [chatUsername, connect];
};

export default useAuth;
