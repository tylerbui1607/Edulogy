import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../../../actions/testActions";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
export default function UpdateTestForm(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ ...props.test });
  const typeName = {
    "mini": "Mini test",
    "part1": "Part I",
    "part2": "Part II",
    "part5": "Part V",
    "part6": "Part VI",
    "part7": "Part VII",
  }
  function handleInputChange(e) {
    console.log({
      [e.target.name]: e.target.value
    });
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    console.log(info);
    dispatch(testActions.updateTest(props.test._id, info));
  }
  return (
    <div className="modal active">
      <div className="info-popup">
        <form id="updateForm" encType="multipart/form-data">
          <h3>Thông tin test</h3>
          <div className="main-info-view">
            <div className="col">
              <label htmlFor="new-name">Tên test:</label>
              <input
                id="new-name"
                type="text"
                name="name"
                value={info.name}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <label htmlFor="new-img">Loại:</label>
              <input
                type="text"
                name="img"
                id="new-img"
                value={typeName[info.type]}
                autoComplete="off"
                readOnly={true}
                disabled={true}
                onChange={handleInputChange}
              />
              <div className="row">
                <label>Level</label>
                <div>
                  <div className="row">
                    <input
                      name="level"
                      type="checkbox"
                      id="new-250-500"
                      value="250-500"
                      onChange={handleInputChange}
                      checked={info.level === "250-500"}
                    />
                    <label htmlFor="new-250-500">250 - 500</label>
                  </div >
                  <div className="row">
                    <input
                      type="checkbox"
                      name="level"
                      id="new-500-750"
                      value="500-750"
                      onChange={handleInputChange}
                      checked={info.level === "500-750"}
                    />
                    <label htmlFor="new-500-750">500 - 750</label>
                  </div>
                  <div className="row">
                    <input
                      type="checkbox"
                      name="level"
                      id="new-750-990"
                      value="750-990"
                      onChange={handleInputChange}
                      checked={info.level === "750-990"}
                    />
                    <label htmlFor="new-750-990">750 - 990</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <label htmlFor="questions">Số lượng câu hỏi: </label>
              <input
                type="text"
                name="questions"
                id="questions"
                readOnly="readonly"
                disabled={true}
                value={info.questions ? info.questions.length : 0}
              />
              <label htmlFor="new-time">Thời gian làm bài: </label>
              <input
                type="number"
                name="time"
                id="new-time"
                value={info.time}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="list-questions-view">
            <h3 style={{ marginTop: "0.5em" }}>Danh sách câu hỏi</h3>
            <div className="header">
              <div className="index">
                STT
              </div>
              <div className="part">
                Part
              </div>
              <div className="content">
                Content
              </div>
            </div>
            <div className="data-row-container">
              {
                info.questions ? info.questions.map((v, i) =>
                  <div className="data-row" key={i}>
                    <div className="index">
                      {i + 1}
                    </div>
                    <div className="part">
                      {v.part}
                    </div>
                    <div className="content">
                      {v.content ? v.content : "[No content]"}
                    </div>
                  </div>
                ) : <></>
              }
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <button onClick={handleSubmit} id="btnSubmit">Lưu</button>
            <button onClick={props.onClose} className="cancel-btn">Đóng</button>
          </div>
        </form>
      </div>
    </div>
  )
}