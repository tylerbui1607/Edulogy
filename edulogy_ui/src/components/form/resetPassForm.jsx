import React, { useState } from 'react'
import {  useDispatch } from 'react-redux';
import { appActions } from '../../actions/appActions';
import { constants } from '../../constants';
import Input from '../../common/input';

function ResetPassForm(props) {

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    resetPass: '',
    newPass: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const { resetPass, newPass } = inputs;

  function handleLoginClick() {
    dispatch(appActions.changePopup(constants.POPUP_LOGIN));
  }

  function validate() {
    let err = {};
    if (!resetPass)
      err.resetPass = "Please enter verify code!";
    if (!newPass)
      err.newPass = "Please enter new password!";
    return err;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = validate();
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }
    fetch('http://localhost:3000/api/users/reset-password', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data);
        if(data.status==="success")
          handleLoginClick();
          alert(data.message);
        return;
      });
  }

  return (
    <form className="form center " onSubmit={handleSubmit}>
      <div className="center-text">
        <h2>Reset Password</h2>
      </div>
      <div className="input-container">
        <Input
          type="text"
          name="resetPass"
          value={resetPass}
          placeholder="verify code"
          error={errors.resetPass}
          handleChange={handleInputChange}
        />
        <Input
          type="password"
          name="newPass"
          value={newPass}
          placeholder="new password"
          error={errors.newPass}
          handleChange={handleInputChange}
        />
        <button
          id="login-btn"
          onClick={handleSubmit}>
          Send
        </button>
        {message.success ? <div className="center-text text-error">{message.success}</div> : <div className="center-text text-error">{message.error}</div>}
      </div>
    </form>
  )
}

export default ResetPassForm