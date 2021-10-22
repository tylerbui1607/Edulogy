import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Link } from "react-router-dom"
import { showSidebar } from "../helper";
import { appActions } from '../actions/appActions';
import { userActions } from '../actions/userActions';
import { constants } from '../constants';

function Nav(props) {
  const dispatch = useDispatch();

  const user = useSelector(store => store.authentication.user);

  function handleLoginClick() {
    dispatch(appActions.changePopup(constants.POPUP_LOGIN));
  }

  function handleProfileClick(){
    dispatch(appActions.changePopup(constants.POPUP_PROFILE));
  }

  function handleLogoutClick() {
    dispatch(userActions.logout());
  }

  function handleShowSidebar() {
    showSidebar();
  }

  let navStyle = {
    background: {},
    logo: "/img/logo_trans.png",
    btnColor: " black-color"
  };

  if (props.currentPage !== "home") {
    navStyle = {
      background: { background: "white" },
      logo: "/img/logo_trans.png",
      btnColor: " black-color"
    }
  }

  return (
    <React.Fragment>
      <div className="nav" style={navStyle.background}>
        <div className="logo">
          <Link to="/"><img src={navStyle.logo} alt="" /></Link>
        </div>
        <div className="dropdown-container">
          <div className="dropdown">
            <a href="/de-thi" className={"dropdown-btn" + navStyle.btnColor}>Kiểm tra +</a>
            <div className="dropdown-list">
              <a href="/de-thi?type=mini" className="dropdown-item">Mini test</a>
              <a href="/de-thi?type=part1" className="dropdown-item">Part I:  Hình ảnh</a>
              <a href="/de-thi?type=part2" className="dropdown-item">Part II: Hội thoại</a>
              <a href="/de-thi?type=part5" className="dropdown-item">Part V: Điền khuyết</a>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/thong-tin" className={"dropdown-btn" + navStyle.btnColor}>Thông tin Toeic</Link>
          </div>
          <div className="dropdown">
            <a href="/thao-luan" className={"dropdown-btn" + navStyle.btnColor}>Thảo luận</a>
          </div>
          <div className="dropdown mobile-display">
            <button onClick={handleShowSidebar}>
              <img src="/img/menu_icon2.png" alt="" />
            </button>
          </div>
          <div className="dropdown">
            {
              !user
                ? <button
                  id="account-btn"
                  onClick={handleLoginClick}>
                  Login
                </button>
                :
                <div className="account-dropdown">
                  <div id="account-btn" className="dropdown-btn account-btn">Thông tin tài khoản</div>
                  <div className="dropdown-list">
                    <a href="#" onClick={handleProfileClick} className="dropdown-item">Thay đổi thông tin</a>
                    <a href="/thong-bao" className="dropdown-item">Thông báo</a>
                    {
                      user.role === "admin" && <a href="/quan-ly" className="dropdown-item">Quản lý</a>
                    }
                    <div onClick={handleLogoutClick} className="dropdown-item">Đăng xuất</div>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Nav