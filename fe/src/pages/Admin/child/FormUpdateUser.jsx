export default function UpdateUserForm(props) {
  return (
    <form onSubmit={props.handleSubmit} id="form">
      <h3>Thông tin người dùng</h3>
      <label htmlFor="name">Tên:</label>
      <input autoComplete="off" type="text" name="name" id="name" value={props.updateInfo.name} />
      <label htmlFor="img">Email:</label>
      <input autoComplete="off" type="text" name="email" id="email" readOnly="readOnly" defaultValue={props.updateInfo.email} />
      <div className="row">
        <label>Phân quyền</label>
        <div>
          <div className="row">
            <input type="checkbox" checked={props.updateInfo.role === "guest"}
              onChange={props.handleChangeLevel} name="level" id="guest" value="guest" />
            <label htmlFor="guest">Học viên</label>
          </div >
          <div className="row">
            <input type="checkbox" checked={props.updateInfo.role === "admin"}
              onChange={props.handleChangeLevel} name="level" id="admin" value="admin" />
            <label htmlFor="admin">Quản trị viên</label>
          </div>
        </div>
      </div>
      <label htmlFor="img">Năng động:</label>
      <input autoComplete="off" type="number" readOnly="readOnly" defaultValue={props.updateInfo.score} name="score" id="score" />
      <div className="row">
        <label>Huy hiệu: </label>
        <div>
          <div className="row">
            <input type="checkbox" checked={props.updateInfo.badge === "pawn"}
              onChange={props.handleChangeLevel} name="level" id="guest" value="guest" />
            <label htmlFor="guest">Pawn</label>
          </div >
          <div className="row">
            <input type="checkbox" checked={props.updateInfo.badge === "knight"}
              onChange={props.handleChangeLevel} name="level" id="admin" value="admin" />
            <label htmlFor="admin">Knight</label>
          </div>
          <div className="row">
            <input type="checkbox" checked={props.updateInfo.badge === "bishop"}
              onChange={props.handleChangeLevel} name="level" id="admin" value="admin" />
            <label htmlFor="admin">Bishop</label>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={props.handleUpdate} id="btnSubmit">Lưu</button>
        <button onClick={props.handleCloseEdit} className="cancel-btn">Đóng</button>
      </div>
    </form>
  )
}