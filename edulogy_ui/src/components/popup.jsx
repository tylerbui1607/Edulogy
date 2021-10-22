import { useSelector } from 'react-redux'

import React from 'react';
import Login from './login';
import ProfilePopup from './profilePopup';
import ForgotPass from './forgetpassword';
function Popup() {

  const popupType = useSelector(state => state.application.popupType);

  let currentPopup = {
    login: <Login />,
    profile:<ProfilePopup/>,
    forgotpass:<ForgotPass/>
  }

  let className = 'popup';

  if (popupType)
    className += ' block';

  return (
    <div className={className}>
      {currentPopup[popupType]}
    </div>
  )
}

export default Popup