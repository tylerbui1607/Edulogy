import { constants } from "../constants";

const initialState = { popupType: "", status: constants.LOADING };

export function application(state = initialState, action) {
  switch (action.type) {
    case constants.POPUP_PROFILE:
      return{
        ...state,
        popupType: "profile"
      }
    case constants.POPUP_FORGOTPASS:
      return {
        ...state,
        popupType: "forgotpass",
      };
    case constants.POPUP_LOGIN:
      return {
        ...state,
        popupType: "login",
      };
    case constants.LOGIN_SUCCESS:
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        popupType: "",
      };
    case constants.HIDE_POPUP:
      return {
        ...state,
        popupType: "",
      };
    case constants.GET_HOME_SUCCESS:
      return {
        ...state,
        status: constants.SUCCESS,
        homeInfo: action.info,
      };
    case constants.GET_HOME_FAILURE:
    case constants.GET_ADMIN_FAILURE:
      return {
        ...state,
        status: constants.FAILURE,
      };
    case constants.GET_ADMIN_SUCCESS:
      return {
        ...state,
        status: constants.SUCCESS,
        adminInfo: action.info,
      };
    default:
      return state;
  }
}
