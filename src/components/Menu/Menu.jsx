import React from 'react';
import { Link } from 'react-router-dom';

import User from '../User/User';

import { useUser, SET_CURRENT_USER } from '../../reducers/useUser';

import app from '../../utils/firebase/base';

import Nav from './Nav';

import { size } from '../../utils/style/variables';

const Menu = () => {
  const { userStore, userDispatch } = useUser();
  const currentUser = userStore.currentUser;

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const handleMenuClick = e => {
    document.querySelector('.menuList').style.display = 'flex';
    document
      .querySelectorAll('.menuButton, .container, footer')
      .forEach(item => {
        item.style.display = 'none';
      });
  };

  const handleCloseMenu = e => {
    if (width >= size.tablet.replace('px', '')) {
      return;
    }
    document.querySelector('.menuList').style.display = 'none';

    document
      .querySelectorAll('.menuButton, .container, footer')
      .forEach(item => {
        item.style.display = 'block';
      });
  };

  const handleSignOut = e => {
    app.auth().signOut();

    userDispatch({
      type: SET_CURRENT_USER,
      payload: null
    });

    if (width >= size.tablet.replace('px', '')) {
      return;
    }
    handleCloseMenu(e);
  };

  return (
    <Nav>
      <div onClick={handleMenuClick} className='menuButton'>
        Menu
      </div>
      <div className='menuList'>
        <div onClick={handleCloseMenu} className='menuClose'>
          X
        </div>
        {!currentUser && (
          <>
            <Link onClick={handleCloseMenu} to='/login'>
              login
            </Link>
            <Link onClick={handleCloseMenu} to='/signup'>
              signup
            </Link>
          </>
        )}

        {currentUser && (
          <>
            <Link onClick={handleCloseMenu} to='/'>
              Listes de dépenses
            </Link>
            <div className='userBox'>
              <User />
              <button onClick={handleSignOut}>Sign out</button>
            </div>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Menu;
