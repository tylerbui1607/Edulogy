import { useSelector } from "react-redux";
import { constants as c } from "../../constants";
import Login from "./child/Login";
import Message from "./child/Message";
import Register from "./child/Register";
import Autohide from "./child/Autohide";
function Popup() {
  const popupInfo = useSelector(state => state.application.popup);
  const popups = {
    [c.POPUP_LOGIN]: <Login />,
    [c.POPUP_REGISTER]: <Register />,
    [c.AUTOHIDE_POPUP]: <Autohide />,
    [c.MESSAGE_POPUP]: <Message />,
    [c.NONE]: <div />
  }
  return (
    popups[popupInfo.type]
  )
}
export { Popup }