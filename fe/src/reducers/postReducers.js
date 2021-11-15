import { constants as c } from "../constants";
const initialState = {
  list: {
    data: [],
    status: c.LOADING,
  },
  hot: {
    data: [],
    status: c.LOADING,
  },
};
export function post(state = initialState, action) {
  switch (action.type) {
    case c.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        list: {
          data: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        list: {
          data: [],
          status: c.FAILURE,
        },
      };
    case c.GET_TRENDING_POSTS_SUCCESS:
      return {
        ...state,
        hot: {
          data: action.data,
          status: c.SUCCESS,
        },
      };
    case c.GET_TRENDING_POSTS_FAILURE:
      return {
        ...state,
        hot: {
          data: [],
          status: c.FAILURE,
        },
      };
    default:
      return state;
  }
}
