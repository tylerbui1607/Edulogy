import { userActions } from "../../../actions/userActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { showStatus } from "../../../helper";
import UpdateUserForm from "./updateUserForm";
import AddUserForm from "./addUserForm";

export default function UserSection(props) {

  const dispatch = useDispatch();
  const [customClass, setCustomClass] = useState({ confirm: "modal", info: "modal" });
  const [updateInfo, setUpdateInfo] = useState({ name: "", nQuestions: 0, questions: [] });
  const [insertInfo, setInsertInfo] = useState({});


  function handleShowEdit(user) {
    setUpdateInfo({ ...user });
    setCustomClass({ ...customClass, info: "modal show_flex" });
  }
  function handleCloseEdit(e) {
    e.preventDefault();
    setCustomClass({ ...customClass, info: "modal" });
  }

  function handleInputUpdateChange(e) {
    let { name, value } = e.target;
    setUpdateInfo({ ...updateInfo, [name]: value });
  }
  function handleInsertInputChange(e) {
    let { name, value } = e.target;
    setInsertInfo({ ...insertInfo, [name]: value });
  }

  function handleUpdate(e) {
    e.preventDefault();
    setCustomClass({ ...customClass, info: "modal" });
    console.log(updateInfo);
    updateInfo.questions = undefined;
    showStatus("loading", "");
    //dispatch(testActions.updateTest(updateInfo._id, updateInfo));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(insertInfo);
    showStatus("loading", "");
    dispatch(userActions.addOne(insertInfo));
  }
  return (
    <div className="admin-section">
      <div className="form-view">
        <AddUserForm
          insertInfo={insertInfo}
          handleSubmit={handleSubmit}
          handleInsertInputChange={handleInsertInputChange}
        />
      </div>
      <div className="table-view">
        <h3>Danh sách người dùng</h3>
        <div className="header">
          <div className="user-name">
            Tên
          </div>
          <div className="email">
            Email
          </div>
          <div className="type">
            Loại
          </div>
          <div className="score">
            Năng động
          </div>
          <div className="badge">
            Huy hiệu
          </div>
          <div className="action">
            Tùy chỉnh
          </div>
        </div>
        <div className="data-row-container">
          {
            props.users.map((v, i) => {
              return (
                <div className="data-row" key={i}>
                  <div className="user-name">
                    {v.name}
                  </div>
                  <div className="email">
                    {v.email}
                  </div>
                  <div className="type">
                    {v.role === "admin" ? "Quản trị" : "Học Viên"}
                  </div>
                  <div className="score">
                    {v.score}
                  </div>
                  <div className="badge-d">
                    {v.badge}
                  </div>
                  <div className="action">
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
        <UpdateUserForm
          handleInputUpdateChange={handleInputUpdateChange}
          updateInfo={updateInfo}
          handleCloseEdit={handleCloseEdit}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  )
}