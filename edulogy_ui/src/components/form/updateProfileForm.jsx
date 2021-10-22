function UpdateProfileForm(props) {
  return (
    <div className="profile_container">
      <div className="profile_ava">
        <img src="https://i.ibb.co/XV70Wzd/470-4703547-privacy-icon-png.png" alt="" />
      </div>
      <form className="profile_form" action="" onSubmit={props.handleSubmit}>
        <div className="input_container">
          <input onChange={props.handleInputChange} name="name" type="text" value={props.Username} />
          <label for="">HọTên</label>
        </div>
        <div className="input_container">
          <input onChange={props.handleInputChange} type="mail" autoComplete="off" name="email" value={props.Email} />
          <label for="">Email</label>
        </div>
        <div className="button_container">
          <button className="save updateinfo_btn">Lưu</button>
          <button className="cancel updateinfo_btn">Hủy</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfileForm