import React, { useState } from "react";
import { userActions } from "../../actions/userActions";
import UpdateProfileForm from "./child/updateProfileForm"
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector(store => store.authentication.user);
  const [inputs, setInputs] = useState({ name: `${user.name}`, email: `${user.email}` });
  const dispatch = useDispatch();
  const Name = inputs.name;
  const Email = inputs.email;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }
  function validate() {
    let err = {};
    if (!Name)
      err.Name = "Vui lòng nhập họ tên";
    if (!Email)
      err.Email = "Vui lòng nhạp email";
    return err;
  }
  function onSubmit(e) {
    e.preventDefault();
    const error = validate();
    if (Object.keys(error).length)
      return;
    dispatch(userActions.update(Name, Email, user._id));
  }
  return (
    <React.Fragment>
      <div>
        <a id="close_updateprofile" href="/"><i class="fas fa-times"></i></a>
        {user && <UpdateProfileForm handleSubmit={onSubmit} Email={Email} Username={Name} handleInputChange={handleInputChange} />}
      </div>
    </React.Fragment>
  )
}
