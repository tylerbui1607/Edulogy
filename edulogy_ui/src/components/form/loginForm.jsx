import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appActions } from '../../actions/appActions';
import { constants } from '../../constants';
import { userActions } from '../../actions/userActions'
import Input from '../../common/input';

function LoginForm(props) {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const { email, password } = inputs;
  const dispatch = useDispatch();

  const message = useSelector(store => store.authentication.message);

  function validate() {
    let err = {};
    if (!email)
      err.email = "Vui lòng nhập email!";
    if (!password)
      err.password = "Vui lòng nhập mật khẩu!";
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
    dispatch(
      userActions.login(email, password)
    );
  }

  function forgotPass() {
    dispatch(appActions.changePopup(constants.POPUP_FORGOTPASS));
  }

  return (
    <form className="form center " onSubmit={handleSubmit}>
      <div className="center-text">
        <h2>Edulogy - Đăng nhập</h2>
        <div>Xin chào, vui lòng nhập thông tin đăng nhập.</div>
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
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Mật khẩu đăng nhập"
          error={errors.password}
          handleChange={handleInputChange}
        />
        <a href="/quen-mat-khau">Quên mật khẩu</a>
        <button
          id="login-btn"
          onClick={handleSubmit}>
          Đăng nhập
        </button>
        {message && <div className="center-text text-error">{message}</div>}
        <div>Chưa có tài khoản? <button onClick={props.onToggle}>Đăng ký ngay</button> </div>
        <div> <button onClick={forgotPass} style={{ color: "#006eff", }}>Forgot password?</button> </div>
      </div>
    </form>
  )
}

export default LoginForm