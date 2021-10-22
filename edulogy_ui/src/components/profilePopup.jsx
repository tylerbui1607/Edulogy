import React, { useState } from "react";
import { userActions } from "../actions/userActions";
import UpdateProfileForm from "./form/updateProfileForm"
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../actions/appActions";
function ProfilePopup() {
  const user = useSelector(store => store.authentication.user);
  const [inputs, setInputs] = useState({name:`${user.name}`,email:`${user.email}`});
  const [error, SetError] = useState({});
  const dispatch = useDispatch();
  const Name = inputs.name;
  const Email = inputs.email; 

  function handleInputChange(e){
    const { name, value } = e.target;
    setInputs(inputs=>({...inputs,[name]:value}));
  }
  function validate(){
    let err={};
    if(!Name)
      err.Name = "Vui lòng nhập họ tên";
    if(!Email)
      err.Email = "Vui lòng nhạp email";
    return err;
  }
  function onSubmit(e){
    e.preventDefault();
    const err = validate();
    if(Object.keys(err).length)
     {
        SetError(err);
        return;
     } 
    SetError({});
    dispatch(userActions.update(Name, Email, user._id));
    alert("Cập nhật thông tin thành công")
    document.location.reload();
  }

  function handleCloseProfile(){
    dispatch(appActions.hidePopup());
  }

  function resetDefaultInfo(e){
    e.preventDefault();
    setInputs({name:`${user.name}`,email:`${user.email}`});
  }
  return (
      <div>
        {user && <UpdateProfileForm Error = {error} resetDefaultInfo = {resetDefaultInfo} handleCloseProfile={handleCloseProfile} handleSubmit = {onSubmit} Email = {Email} Username = {Name} handleInputChange = {handleInputChange} />}
      </div>
  )
}

export default ProfilePopup