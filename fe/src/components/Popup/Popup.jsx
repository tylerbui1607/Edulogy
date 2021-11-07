import { useSelector } from "react-redux";
import { constants as c } from "../../constants";
import Login from "./child/Login";
import Register from "./child/Register";
function Popup() {
  const popupInfo = useSelector(state => state.application.popup);
  const popups = {
    [c.POPUP_LOGIN]: <Login />,
    [c.POPUP_REGISTER]: <Register />,
    [c.NONE]: <div />
  }
  return (
    popups[popupInfo.type]
  )
}
export { Popup }