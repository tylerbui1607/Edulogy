import { userService } from "../services/userServices";
import { constants } from "../constants";
import { showStatus } from "../helper";
function login(email, password) {
  return (dispatch) => {
    userService.login(email, password).then((res) => {
      if (res.user) dispatch(success(res.user));
      else dispatch(failure(res.message));
    });
  };

  function success(user) {
    return { type: constants.LOGIN_SUCCESS, user };
  }
  function failure(message) {
    return { type: constants.LOGIN_FAILURE, message };
  }
}

function register(name, email, password) {
  return (dispatch) => {
    userService.register(name, email, password).then((res) => {
      if (res.user) dispatch(success(res.user));
      else dispatch(failure(res.message));
    });
  };

  function success(user) {
    return { type: constants.REGISTER_SUCCESS, user };
  }
  function failure(message) {
    return { type: constants.REGISTER_FAILURE, message };
  }
}

function logout() {
  userService.logout();
  return (dispatch) => {
    dispatch({ type: constants.LOGOUT });
  };
}

function update(name, email, id) {
  return (dispatch) => {
    userService.update(name, email, id).then((res) => {
      console.log(res.doc);
      if (res.doc) dispatch(success(res.doc));
    });
  };
  function success(user) {
    return { type: constants.UPDATE_SUCCESS, user };
  }
}

function addOne(user) {
  return (dispatch) => {
    userService.addOne(user).then((res) => {
      if (res.user) dispatch(success(res.user));
      else dispatch(failure(res.message));
    });
  };

  function success(user) {
    showStatus("success", "Thêm người dùng thành công !");
    return { type: constants.CREATE_USER_SUCCESS, user };
  }
  function failure(message) {
    showStatus("fail", "Có lỗi xảy ra vui lòng thử lại sau !<br/>" + message);
    return { type: constants.CREATE_USER_FAILURE, message };
  }
}

export const userActions = {
  login,
  logout,
  register,
  update,
  addOne,
};
