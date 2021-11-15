import { postServices } from "../services/postServices";
import { constants as c } from "../constants";
function getAllPosts() {
  return (dispatch) => {
    postServices.getAllPosts().then((res) => {
      if (res.status === "success") {
        dispatch(success(res.doc));
        return;
      }
      dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_ALL_POSTS_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_ALL_POSTS_FAILURE };
  }
}
function getTrendingPosts() {
  return (dispatch) => {
    postServices.getAllPosts().then((res) => {
      if (res.status === "success") {
        dispatch(success(res.doc));
        return;
      }
      dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_TRENDING_POSTS_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_TRENDING_POSTS_FAILURE };
  }
}
export const postActions = { getAllPosts, getTrendingPosts };
