import { testService } from "../services/testServices";
import { constants as c } from "../constants";
import { showStatus } from "../helper";

function getTestById(id) {
  return (dispatch) => {
    testService.getTestById(id).then((res) => {
      if (res.doc) dispatch(success(res.doc));
      else dispatch(failure());
    });
  };
  function success(test) {
    return { type: c.GET_TEST_SUCCESS, test };
  }
  function failure(msg) {
    return { type: c.GET_TEST_FAILURE };
  }
}

function getTest(query) {
  return (dispatch) => {
    testService.getTest(query).then((res) => {
      if (res.doc) dispatch(success(res.doc, res.totalPage));
      else dispatch(failure(res.message));
    });
  };
  function success(tests, totalPage) {
    return { type: c.GET_TESTS_SUCCESS, tests, totalPage };
  }
  function failure(message) {
    return { type: c.GET_TESTS_FAILURE, message };
  }
}

function addTest(test) {
  return (dispatch) => {
    testService.addTest(test).then((res) => {
      if (res.status === "success") {
        showStatus("success", "Thêm test thành công !");
        dispatch(success());
      } else {
        showStatus(
          "fail",
          "Có lỗi xảy ra vui lòng thử lại sau !<br/>" + res.message
        );
        dispatch(failure());
      }
    });
  };
  function success() {
    return { type: c.ADD_TEST_SUCCESS };
  }
  function failure(message) {
    return { type: c.ADD_TEST_FAILURE, message };
  }
}

function deleteTest(id) {
  return (dispatch) => {
    testService.deleteTest(id).then((res) => {
      if (res.status === "success") {
        showStatus("success", "Xóa test thành công !");
        dispatch(success());
      } else {
        showStatus("fail", "Có lỗi xảy ra vui lòng thử lại sau !");
        dispatch(failure(res.message));
      }
    });
  };
  function success() {
    return { type: c.DELETE_TEST_SUCCESS };
  }
  function failure(message) {
    return { type: c.DELETE_TEST_FAILURE, message };
  }
}

function updateTest(id, test) {
  return (dispatch) => {
    testService.updateTest(id, test).then((res) => {
      if (res.status === "success") {
        showStatus("success", "Cập nhật thông tin test thành công !");
        dispatch(success());
      } else {
        showStatus("fail", "Có lỗi xảy ra vui lòng thử lại sau !");
        dispatch(failure());
      }
    });
  };
  function success() {
    return { type: c.UPDATE_TEST_SUCCESS };
  }
  function failure(message) {
    return { type: c.UPDATE_TEST_FAILURE };
  }
}

export const testActions = {
  getTest,
  addTest,
  deleteTest,
  getTestById,
  updateTest,
};
