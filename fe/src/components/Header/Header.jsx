import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showSidebar } from "../../helper";
import { appActions } from '../../actions/appActions';
import { userActions } from '../../actions/userActions';
import { constants as c } from '../../constants';
import Sidebar from "./child/Sidebar";
function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector(store => store.authentication.user);
  function handleLoginClick() {
    dispatch(appActions.changePopup(c.POPUP_LOGIN));
  }
  function handleProfileClick(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.POPUP_PROFILE));
  }
  function handleLogoutClick() {
    dispatch(userActions.logout());
  }
  function handleShowSidebar() {
    showSidebar();
  }
  return (
    <React.Fragment>
      <div style={{ background: "white" }}>
        <div className="nav container" id="header">
          <div className="logo">
            <a href="/">
              <img src="https://i.ibb.co/vLDR33T/cloud-logo-vector-design-template-260nw-1812087388.jpg" alt="" />
            </a>
          </div>
          <div className="dropdown-container">
            <div className="dropdown">
              <a href="/de-thi" className="dropdown-btn">Đề kiểm tra +</a>
              <div className="dropdown-list">
                <a href="/de-thi?type=mini" className="dropdown-item">Mini test</a>
                <a href="/de-thi?type=part1" className="dropdown-item">Part I:  Hình ảnh</a>
                <a href="/de-thi?type=part2" className="dropdown-item">Part II: Hội thoại</a>
                <a href="/de-thi?type=part5" className="dropdown-item">Part V: Điền khuyết</a>
              </div>
            </div>
            <div className="dropdown">
              <a href="/thong-tin" className="dropdown-btn">Thông tin Toeic</a>
            </div>
            <div className="dropdown">
              <a href="/forum" className="dropdown-btn">Diễn đàng</a>
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
                    Đăng nhập
                  </button>
                  :
                  <div className="account-dropdown">
                    <div
                      id="account-btn"
                      className="dropdown-btn account-btn"
                    >
                      Thông tin tài khoản
                    </div>
                    <div className="dropdown-list">
                      <a
                        href="/"
                        onClick={handleProfileClick}
                        className="dropdown-item">
                        Thay đổi thông tin
                      </a>
                      <a
                        href="/thong-bao"
                        className="dropdown-item"
                      >
                        Thông báo
                      </a>
                      {
                        user.role === "admin" &&
                        <a href="/quan-ly" className="dropdown-item">
                          Quản lý
                        </a>
                      }
                      <div onClick={handleLogoutClick} className="dropdown-item">Đăng xuất</div>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </React.Fragment>
  )
}
export { Header }