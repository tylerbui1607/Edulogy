import React, { useState } from 'react'

import Input from '../../common/input';

function ForgotPassForm(props) {
  const [input, setInput] = useState({
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const { email } = input;
  

  function validate() {
    let err = {};
    if (!email)
      err.email = "Please enter email!";
    return err;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = validate();
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }
    fetch('http://localhost:3000/api/users/forgot-password', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data.success);
          props.onToggle();
          alert(data.success);
        }
        else {
          console.log(data.message)
          setMessage(data.message);
          return;
        }
      });
  }

  return (
    <form className="form center " onSubmit={handleSubmit}>
      <div className="center-text">
        <h2>Forgot Password</h2>
      </div>
      <div className="input-container">
        <Input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          error={errors.email}
          handleChange={handleInputChange}
        />
        <button
          id="login-btn"
          onClick={handleSubmit}>
          Send
        </button>
        {message && <div className="center-text text-error">{message}</div>}
      </div>
    </form>
  )
}

export default ForgotPassForm