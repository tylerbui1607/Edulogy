import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import Banner from './child/Banner';
import SectionTest from "./child/SectionTest";
import SectionIntro from "./child/SectionInro";
import Loading from '../../components/Common/Loading';
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
      <div className="home">
        {homeStatus === c.LOADING ? <Loading />
          :
          <div className="main-view">
            <Banner />
            <SectionIntro />
            <div className="row">
              <span>LUYỆN THI TOEIC MIỄN PHÍ</span>
              <div className="flex">
                <button
                  className={currentLevel === "level1" ? "active" : ""}
                  onClick={() => handleChangeLevel("level1")}>
                  Level 250 - 500
                </button>
                <button
                  className={currentLevel === "level2" ? "active" : ""}
                  onClick={() => handleChangeLevel("level2")}>
                  Level 500 - 750
                </button>
                <button
                  className={currentLevel === "level3" ? "active" : ""}
                  onClick={() => handleChangeLevel("level3")}>
                  Level 750 - 990
                </button>
              </div>
            </div>
            <SectionTest tests={tests} />
          </div>
        }
      </div>
    </React.Fragment >
  )
}
export { HomePage }