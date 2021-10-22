import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import LoadingPage from "../loadingPage";
import TestSection from "./child/testSection";
import UserSection from "./child/userSection";
import ReportView from "./child/reportView";

function AdminPage() {

  const dispatch = useDispatch();
  const status = useSelector(state => state.application.status);
  const info = useSelector(state => state.application.adminInfo);

  const [currentSection, setCurrentSection] = useState("user");
  const [customStyle, setCustomStyle] = useState({ container: { height: "0" } });
  const sections = {
    "test": <TestSection tests={info ? info.tests : []} />,
    "user": <UserSection users={info ? info.users : []} />
  }
  function handleChangeSection(s) {
    setCurrentSection(s);
    handleToggleSetting();
  }
  function handleToggleSetting() {
    if (customStyle.container.height === "0") {
      setCustomStyle({ container: { height: "90px" } });
      return;
    }
    setCustomStyle({ container: { height: "0" } });
  }
  useEffect(() => {
    if (status === c.LOADING) {
      dispatch(appActions.getAdminInfo());
    } else {
      console.log(info)
    }
  }, [status, dispatch])
  return (
    <div className="admin-page">
      {
        status === c.LOADING ? <LoadingPage />
          :
          <React.Fragment>
            <ReportView
              tests={info.tests.length}
              questions={info.questions}
              users={info.users.length}
            />
            {sections[currentSection]}
            <button className="setting-btn" onClick={handleToggleSetting}>
              <i className="fas fa-cog"></i>
            </button>
            <div className="setting-tab-container" style={{ height: customStyle.container.height }}>
              <div className="setting-tab" onClick={() => handleChangeSection("user")}>
                Quản lý người dùng
              </div>
              <div className="setting-tab" onClick={() => handleChangeSection("test")}>
                Quản lý đề thi
              </div>
              <div className="setting-tab">
                Về trang chủ
              </div>
            </div>
          </React.Fragment>
      }
    </div>
  )
}

export { AdminPage }