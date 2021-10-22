import ToeicLocation from "./child/toeicLocation";
import ToeicProcess from "./child/toeicProcess";
import ToeicOutcome from "./child/toeicOutcome";
import Nav from "../../common/nav";
import Footer from "../../common/footer";
import MenuSlider from "../../common/menuSidebar";
import Popup from "../../components/popup";
import React, { useState } from "react";

function ToeicInfoPage() {

  document.title = "Thông tin Toeic"

  const [customStyle, setCustomStyle] = useState({ location: "block", process: "none", output: "none" });

  function handleChangeTab(tab) {
    let cStyle = { ...customStyle };
    cStyle.location = "none";
    cStyle.process = "none";
    cStyle.output = "none";
    cStyle[tab] = "block";
    setCustomStyle(cStyle);
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="toeic-info">
        <div className="tab-container">
          <button onClick={() => handleChangeTab("location")}>Địa điểm thi Toeic</button>
          <button onClick={() => handleChangeTab("process")}>Thủ tục đăng ký</button>
          <button onClick={() => handleChangeTab("output")}>Nhận kết quả thi</button>
        </div>
        <div className="info-container">
          <ToeicLocation display={customStyle.location} />
          <ToeicProcess display={customStyle.process} />
          <ToeicOutcome display={customStyle.output} />
        </div>
      </div>
      <Footer />
      <Popup />
      <MenuSlider />
    </React.Fragment>
  )
}

export { ToeicInfoPage }