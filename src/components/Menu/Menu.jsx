import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';

import User from '../User/User';

import { useUser, SET_CURRENT_USER } from '../../reducers/useUser';

import app from '../../utils/firebase/base';

import Nav from './Nav';

import { size } from '../../utils/style/variables';

const Menu = () => {
  const [showSignup, setShowSignup] = useState(true);
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
    const buttonText = e.target.innerText;
    if (buttonText === 'Signup') {
      setShowSignup(false);
    } else if (buttonText === 'Login') {
      setShowSignup(true);
    }

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

    // userDispatch({
    //   type: SET_CURRENT_USER,
    //   payload: null
    // });
  };

  return (
    <Nav>
      <div onClick={handleMenuClick} className='menuButton'>
        <GiHamburgerMenu />
      </div>
      <div className='menuList'>
        <div onClick={handleCloseMenu} className='menuClose'>
          <IoMdClose />
        </div>
        {!currentUser && (
          <>
            {!showSignup && (
              <Link onClick={handleCloseMenu} to='/login'>
                Login
              </Link>
            )}
            {showSignup && (
              <Link onClick={handleCloseMenu} to='/signup'>
                Signup
              </Link>
            )}
          </>
        )}

        {currentUser && (
          <>
            <Link onClick={handleCloseMenu} to='/'>
              Listes de dépenses
            </Link>
            <div className='userBox'>
              <User />
              <button onClick={handleSignOut}>
                <FaSignOutAlt />
              </button>
            </div>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Menu;
