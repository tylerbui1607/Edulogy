import { constants as c } from "../constants";

let initialState = { status: c.LOADING, tests: [] };

export function test(state = initialState, action) {
  switch (action.type) {
    case c.GET_TEST_SUCCESS:
      return {
        test: action.test,
        status: c.SUCCESS,
      };
    case c.GET_TEST_FAILURE:
    case c.GET_TESTS_FAILURE: {
      return {
        status: c.FAILURE,
      };
    }
    case "CHANGE_TEST_PAGE":
      console.log("change");
      return { ...state, status: c.LOADING };
    case c.GET_TESTS_SUCCESS:
      return {
        status: c.SUCCESS,
        tests: action.tests,
        totalPage: action.totalPage,
      };
    default:
      return state;
  }
}
