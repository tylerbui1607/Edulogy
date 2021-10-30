import { testActions } from "../../../actions/testActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { showStatus } from "../../../helper";
import UpdateTestForm from "./updateTestForm";
import AddTestForm from "./addTestForm";

export default function TestSection(props) {

  const dispatch = useDispatch();

  const [currentLevel, setCurrentLevel] = useState("");
  const [customClass, setCustomClass] = useState({ confirm: "modal", info: "modal" });
  const [selectedTest, setSelectedTest] = useState({});
  const [updateInfo, setUpdateInfo] = useState({ name: "", nQuestions: 0, questions: [] });

  function handleChangeLevel(e) {
    setCurrentLevel(e.target.value);
    console.log(e.target.value);
  }

  function handleDelete(test) {
    setCustomClass({ ...customClass, confirm: "modal show_flex" });
    setSelectedTest(test);
  }

  function handleConfirmDelete() {
    setCustomClass({ ...customClass, confirm: "modal" });
    showStatus("loading", "");
    dispatch(testActions.deleteTest(selectedTest._id));
  }

  function handleCancelDelete() {
    setCustomClass({ ...customClass, confirm: "modal" });
  }

  function handleShowEdit(test) {
    setSelectedTest(test);
    setUpdateInfo({ ...test, nQuestions: test.questions.length });
    setCustomClass({ ...customClass, info: "modal show_flex" });
  }

  function handleCloseEdit(e) {
    e.preventDefault();
    setCustomClass({ ...customClass, info: "modal" });
  }

  function handleUpdateLevel(level) {
    setUpdateInfo({ ...updateInfo, level: level });
  }

  function handleInputUpdateChange(e) {
    let { name, value } = e.target;
    setUpdateInfo({ ...updateInfo, [name]: value });
  }

  function handleUpdate(e) {
    e.preventDefault();
    setCustomClass({ ...customClass, info: "modal" });
    console.log(updateInfo);
    updateInfo.questions = undefined;
    showStatus("loading", "");
    dispatch(testActions.updateTest(selectedTest._id, updateInfo));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("form");
    let fromdata = new FormData(form);
    console.log(fromdata);
    showStatus("loading", "");
    dispatch(testActions.addTest(fromdata));
  }
  return (
    <div className="admin-section">
      <div className="form-view">
        <AddTestForm
          handleSubmit={handleSubmit}
          currentLevel={currentLevel}
          handleChangeLevel={handleChangeLevel}
        />
      </div>
      <div className="table-view">
        <h3>Danh sách test</h3>
        <div className="header">
          <div className="name">
            Tên test
          </div>
          <div className="level">
            Level
          </div>
          <div className="number-questions">
            Câu hỏi
          </div>
          <div className="time">
            Thời gian
          </div>
          <div className="action">
            Tùy chỉnh
          </div>
        </div>
        <div className="data-row-container">
          {
            props.tests.map((v, i) => {
              return (
                <div className="data-row" key={i}>
                  <div className="name">
                    {v.name}
                  </div>
                  <div className="level">
                    {v.level}
                  </div>
                  <div className="number-questions">
                    {v.questions.length}
                  </div>
                  <div className="time">
                    {v.time}
                  </div>
                  <div className="action">
                    <button onClick={() => handleDelete(v)} className="delete-btn">
                      <i className="far fa-trash-alt"></i>
                    </button>
                    <button onClick={() => handleShowEdit(v)} className="edit-btn">
                      <i className="far fa-edit"></i>
                    </button>
                  </div>
                </div>
              )
            }
            )
          }
        </div>
      </div>
      <div className={customClass.info}>
        <UpdateTestForm
          updateInfo={updateInfo}
          handleInputUpdateChange={handleInputUpdateChange}
          handleUpdateLevel={handleUpdateLevel}
          handleUpdate={handleUpdate}
          handleCloseEdit={handleCloseEdit}
        />
      </div>
      <div className={customClass.confirm}>
        <div className="confirm-popup">
          <div>Xác nhận xóa test đã chọn ?</div>
          <div>
            <button onClick={handleConfirmDelete} className="confirm-btn">Xác nhận</button>
            <button onClick={handleCancelDelete} className="cancel-btn">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  )
}