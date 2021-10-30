export default function AddTestForm(props) {
  return (
    <form onSubmit={props.handleSubmit} id="form">
      <h3>Tạo test mới</h3>
      <label htmlFor="name">Tên test:</label>
      <input autoComplete="off" type="text" name="name" id="name" />
      <label htmlFor="img">Ảnh minh họa:</label>
      <input autoComplete="off" type="text" name="img" id="img" />
      <div className="row">
        <label>Level</label>
        <div>
          <div className="row">
            <input type="checkbox" checked={props.currentLevel === "250-500"}
              onChange={props.handleChangeLevel} name="level" id="250-500" value="250-500" />
            <label htmlFor="250-500">250 - 500</label>
          </div >
          <div className="row">
            <input type="checkbox" checked={props.currentLevel === "500-750"}
              onChange={props.handleChangeLevel} name="level" id="500-750" value="500-750" />
            <label htmlFor="500-750">500 - 750</label>
          </div>
          <div className="row">
            <input type="checkbox" checked={props.currentLevel === "750-990"}
              onChange={props.handleChangeLevel} name="level" id="750-990" value="750-990" />
            <label htmlFor="750-990">750 - 990</label>
          </div>
        </div>
      </div>
      <label htmlFor="time">Thời gian làm bài: </label>
      <input type="number" name="time" id="time" />
      <div className="row">
        <label htmlFor="file">File test</label>
        <input type="file" name="file" id="file" />
      </div>
      <button id="btnSubmit">Lưu</button>
    </form>
  )
}