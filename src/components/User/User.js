import React from 'react';

import { useUser } from '../../reducers/useUser';

export const User = () => {
  const { userStore, userDispatch } = useUser();
  const currentUser = userStore.currentUser;

  return <div>{currentUser ? currentUser : 'guest'}</div>;
};

export default User;
