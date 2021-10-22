import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ForgotPassForm from './form/forgotPassForm';
import ResetPassForm from './form/resetPassForm';

import { appActions } from '../actions/appActions';


function ForgotPass() {

  const [currentForm, setCurrentForm] = useState('forgot-pass')

  const dispatch = useDispatch();

  function toggleForm() {
    console.log('toggle form');
    let form = currentForm === 'forgot-pass' ? 'reset-pass' : 'forgot-pass';
    setCurrentForm(form);
  }

  function handleCloseForm() {
    dispatch(appActions.hidePopup());
  }

  return (
    <div className="login-container center">
      <button className="close-btn" onClick={handleCloseForm}>X</button>
      <div className="img-container">
        <img src="/login_banner.png" className='center' alt="#" />
      </div>
      <div className="form-container">
        {currentForm === 'forgot-pass'
          ? <ForgotPassForm onToggle={toggleForm} />
          : <ResetPassForm onToggle={toggleForm} />
        }
      </div>
    </div>
  )
}

export default ForgotPass