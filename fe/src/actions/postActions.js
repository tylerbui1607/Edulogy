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
    postServices.getTrendingPosts().then((res) => {
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
function createPost(info) {
  return (dispatch) => {
    postServices.createPost(info).then((res) => {
      if (res.status === "success") {
        dispatch(success(res.doc));
        return;
      }
      dispatch(failure(res.message));
    });
  };
  function success(data) {
    return { type: c.CREATE_NEW_POST_SUCCESS };
  }
  function failure(msg) {
    return { type: c.CREATE_NEW_POST_FAILURE, msg };
  }
}
function getPostById(id) {
  return (dispatch) => {
    postServices.getPostById(id).then((res) => {
      if (res.status === "success") {
        dispatch(success(res.doc));
        return;
      }
      dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.GET_POST_SUCCESS, data };
  }
  function failure() {
    return { type: c.GET_POST_FAILURE };
  }
}
function commentPost(id, info) {
  return (dispatch) => {
    postServices.commentPost(id, info).then((res) => {
      if (res.status === "success") {
        dispatch(success(res.doc));
        return;
      }
      dispatch(failure());
    });
  };
  function success(data) {
    return { type: c.COMMENT_POST_SUCCESS, data };
  }
  function failure() {
    return { type: c.COMMENT_POST_FAILURE };
  }
}
export const postActions = {
  getAllPosts,
  getTrendingPosts,
  createPost,
  getPostById,
  commentPost,
};
