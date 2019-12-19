import React, { useContext } from 'react';

import { AuthContext } from '../Auth/Auth.js';

export const User = () => {
  const { currentUser } = useContext(AuthContext);

  return <div>{currentUser ? currentUser.email : 'guest'}</div>;
};

export default User;
