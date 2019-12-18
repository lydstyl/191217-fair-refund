import React, { useContext } from 'react';

import { AuthContext } from './Auth.js';

export const User = () => {
  const { currentUser } = useContext(AuthContext);

  return <>{currentUser ? currentUser.email : 'guest'}</>;
};

export default User;
