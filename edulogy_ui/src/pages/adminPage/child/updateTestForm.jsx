import React from "react"
export default function UpdateTestForm(props) {
  console.log(props.updateInfo);
  return (
    <div className="info-popup">
      <form id="updateForm" encType="multipart/form-data">
        <h3>Thông tin test</h3>
        <div className="main-info-view">
          <div className="col">
            <label htmlFor="new-name">Tên test:</label>
            <input autoComplete="off" type="text" name="name" onChange={props.handleInputUpdateChange}
              id="new-name" value={props.updateInfo.name} />
            <label htmlFor="new-img">Ảnh minh họa:</label>
            <input autoComplete="off" type="text" name="img" onChange={props.handleInputUpdateChange}
              id="new-img" defaultValue={props.updateInfo.img} />
            <div className="row">
              <label>Level</label>
              <div>
                <div className="row">
                  <input type="checkbox" checked={props.updateInfo.level === "250-500"}
                    onChange={() => props.handleUpdateLevel("250-500")} name="level" id="new-250-500" value="250-500" />
                  <label htmlFor="new-250-500">250 - 500</label>
                </div >
                <div className="row">
                  <input type="checkbox" checked={props.updateInfo.level === "500-750"}
                    onChange={() => props.handleUpdateLevel("500-750")} name="level" id="new-500-750" value="500-750" />
                  <label htmlFor="new-500-750">500 - 750</label>
                </div>
                <div className="row">
                  <input type="checkbox" checked={props.updateInfo.level === "750-990"}
                    onChange={() => props.handleUpdateLevel("750-990")} name="level" id="new-750-990" value="750-990" />
                  <label htmlFor="new-750-990">750 - 990</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <label htmlFor="questions">Số lượng câu hỏi: </label>
            <input type="text" name="questions" id="questions" readOnly="readonly"
              value={props.updateInfo.questions ? props.updateInfo.questions.length : 0} />
            <label htmlFor="new-time">Thời gian làm bài: </label>
            <input type="number" name="time" onChange={props.handleInputUpdateChange}
              id="new-time" defaultValue={props.updateInfo.time} />
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
              props.updateInfo.questions ? props.updateInfo.questions.map((v, i) =>
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
          <button onClick={props.handleUpdate} id="btnSubmit">Lưu</button>
          <button onClick={props.handleCloseEdit} className="cancel-btn">Đóng</button>
        </div>
      </form>
    </div>
  )
}