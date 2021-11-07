import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from "../../../constants";
import { appActions } from '../../../actions/appActions';
import { userActions } from '../../../actions/userActions';
import Input from './Input';
function Login(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { email, password } = inputs;
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
    dispatch(appActions.changePopup(c.POPUP_FORGOTPASS));
  }
  function handleCloseForm() {
    dispatch(appActions.changePopup(c.NONE));
  }
  function handleRegisClick() {
    dispatch(appActions.changePopup(c.POPUP_REGISTER));
  }
  return (
    <div className="modal active">
      <div className="login-container form-container">
        <button
          className="close-btn"
          onClick={handleCloseForm}>
          <i className="far fa-times-circle"></i>
        </button>
        <div className="img-container">
          <img src="/login_banner.png" className='center' alt="#" />
        </div>
        <div className="form-container">
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
              <div>
                Chưa có tài khoản?&nbsp;
                <button onClick={handleRegisClick}>
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login