import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import User from '../User/User';
import { AuthContext } from '../Auth/Auth';

import app from '../../utils/firebase/base';

import './Menu.scss';

const Menu = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className='menu'>
      {!currentUser && <Link to='/login'>login</Link>}
      <Link to='/signup'>signup</Link>
      {currentUser && <Link to='/'>Home</Link>}
      {currentUser && <Link to='/quotes'>quotes</Link>}
      <div className='userBox'>
        <User />
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </div>
    </nav>
  );
};

export default Menu;
