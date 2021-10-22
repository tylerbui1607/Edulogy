import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

import Nav from '../../common/nav';
import Footer from '../../common/footer';
import Banner from '../../common/banner';
import Popup from '../../components/popup';
import ListSkill from './child/listSkills';
import MenuSidebar from "../../common/menuSidebar";
import HomeSection from "./child/homeSection";
import LoadingPage from "../loadingPage";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";

function HomePage() {

  let dispatch = useDispatch();
  let homeInfo = useSelector(state => state.application.homeInfo);
  let homeStatus = useSelector(state => state.application.status);

  const [currentLevel, setCurrentLevel] = useState("level1");
  const tests = useMemo(() => homeInfo ? homeInfo[currentLevel] : [], [homeInfo, currentLevel]);

  function handleChangeLevel(lv) {
    setCurrentLevel(lv);
  }

  useEffect(() => {
    document.title = "Edulogy - Trang chủ"
    if (homeStatus === c.LOADING)
      dispatch(appActions.getHomeInfo());
    else
      console.log(homeInfo);
  }, [dispatch, homeStatus, homeInfo])

  return (
    <React.Fragment>
      <Nav currentPage={"home"} />
      <div className="home">
        {homeStatus === c.LOADING ? <LoadingPage />
          :
          <div className="main-view">
            <Banner />
            <ListSkill />
            <div className="row">
              <span>LUYỆN THI TOEIC MIỄN PHÍ</span>
              <div className="flex">
                <button onClick={() => handleChangeLevel("level1")}>Level 250 - 500</button>
                <button onClick={() => handleChangeLevel("level2")}>Level 500 - 750</button>
                <button onClick={() => handleChangeLevel("level3")}>Level 750 - 990</button>
              </div>
            </div>
            <HomeSection tests={tests} />
          </div>
        }
      </div>
      <Footer />
      <Popup />
      <MenuSidebar />
    </React.Fragment >
  )
}

export { HomePage }