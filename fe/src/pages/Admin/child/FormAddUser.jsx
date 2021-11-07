export default function AddUserForm(props) {
  return (
    <form onSubmit={props.handleSubmit} id="form">
      <h3>Thêm người dùng</h3>
      <label htmlFor="name">Tên:</label>
      <input onChange={props.handleInsertInputChange} autoComplete="off" type="text" name="name" id="name" />
      <label htmlFor="img">Email:</label>
      <input onChange={props.handleInsertInputChange} autoComplete="off" type="text" name="email" id="email" />
      <div className="row">
        <label>Phân quyền</label>
        <div>
          <div className="row">
            <input type="checkbox" checked={props.insertInfo.role === "guest"}
              onChange={props.handleInsertInputChange} name="role" id="guest" value="guest" />
            <label htmlFor="guest">Học viên</label>
          </div >
          <div className="row">
            <input type="checkbox" checked={props.insertInfo.role === "admin"}
              onChange={props.handleInsertInputChange} name="role" id="admin" value="admin" />
            <label htmlFor="admin">Quản trị viên</label>
          </div>
        </div>
      </div>
      <label htmlFor="img">Mật khẩu:</label>
      <input onChange={props.handleInsertInputChange} autoComplete="off" type="text" name="password" id="pasword" />
      <button id="btnSubmit">Lưu</button>
    </form>
  )
}