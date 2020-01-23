import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';

import txt from './translations';

import User from '../User/User';

import { useSettingsCtx } from '../../context/useSettings/useSettingsCtx';
import { useUser } from '../../reducers/useUser';
import { useChargeCtx } from '../../context/useCharge2/useChargeCtx';

import chargeActions from '../../context/useCharge2/chargeActions';

import app from '../../utils/firebase/base';

import Nav from './Nav';

import { size } from '../../utils/style/variables';

const Menu = () => {
  const { settingsStore, settingsDispatch } = useSettingsCtx();
  const { lang, selectedColor } = settingsStore;
  const [showSignup, setShowSignup] = useState(true);
  const { userStore } = useUser();
  const currentUser = userStore.currentUser;
  const { chargeDispatch } = useChargeCtx();

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
  };

  const showChargesLists = e => {
    chargeDispatch({
      type: chargeActions.RESET_CHARGES_LIST.type
    });

    handleCloseMenu(e);
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
            <Link onClick={showChargesLists} to='/'>
              {txt.chargesLists[lang]}
            </Link>
            <Link onClick={handleCloseMenu} to='/settings'>
              Paramètres
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
