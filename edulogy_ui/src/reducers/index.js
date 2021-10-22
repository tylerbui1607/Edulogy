import { combineReducers } from "redux";

import { authentication } from "./authReducers";
import { application } from "./appReducers";
import { test } from "./testReducers";

const rootReducer = combineReducers({
  authentication,
  application,
  test,
});

export default rootReducer;
