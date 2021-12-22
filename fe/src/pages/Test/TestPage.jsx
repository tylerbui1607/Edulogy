import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { constants as c } from "../../constants";
import { testActions } from "../../actions/testActions";
import SubView from "./child/SubView";
import MainView from "./child/MainView";
import ScorePopup from './child/ScorePopup';
import Loading from '../../components/Common/Loading';
import Section from './child/Section';
function TestPage(props) {
  let dispatch = useDispatch();
  let test = useSelector(state => state.test.test);
  let [score, setScore] = useState(0);
  let [nQuestionsInSection, setNQuestionsInSection] = useState([]);
  let [currentSection, setCurrentSection] = useState(0);
  let [listPart, setListPart] = useState([]);
  let [popupClass, setPopupClass] = useState("");
  let [mode, setMode] = useState(c.DO_TEST_MODE);
  let [currentPart, setCurrrentPart] = useState(1);
  let [listAnswers, setListAnswers] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  function getTrueAnswers(test) {
    let tanswers = [];
    if (test) {
      for (let i = 0; i < test.questions.length; i++) {
        for (let j = 0; j < test.questions[i].answers.length; j++)
          if (test.questions[i].answers[j].isTrue)
            tanswers.push(j);
      }
      return tanswers;
    }
  }
  //let trueAnswers = useMemo(() => getTrueAnswers(test), [test]);
  function handleAnswers(i) {
    if (mode === c.DO_TEST_MODE) {
      let lanswers = [...listAnswers];
      lanswers[currentQuestion] = i;
      setListAnswers(lanswers);
    }
  }
  function handleChangeQuestion(i) {
    if (i < 0 || i >= test.questions.length)
      return;
    setCurrentQuestion(i);
    setCurrrentPart(test.questions[i].part);
  }
  function handleChangePart(i) {
    setCurrrentPart(i);
    setCurrentQuestion(listPart[i]);
  }
  function handleRedo() {
    document.location.reload();
  }
  function handleSubmit() {
    // if (mode === c.DO_TEST_MODE) {
    //   let s = 0;
    //   for (let i = 0; i < trueAnswers.length; i++)
    //     if (trueAnswers[i] === listAnswers[i])
    //       s++;
    //   setScore(s);
    //   setPopupClass("active");
    //   setMode(c.SUBMITED_MODE);
    // }
  }
  function closeScorePopup() {
    setPopupClass("")
  }
  useEffect(() => {
    if (!test)
      dispatch(testActions.getTestById(props.match.params.id));
    document.getElementById("header").style.display = "none";
    document.getElementById("footer").style.display = "none"
  }, []);
  console.log(test);
  return (
    test ?
      <>
        <div className="bottom">
          <h4>Ielts reading sample 01</h4>
          <button>
            <i className="fas fa-chevron-down"></i>
            &nbsp;
            Danh sách câu hỏi
          </button>
        </div>
        <div className="test-page container">
          <div className="paragraph-display">
            <h2>{test.sections[currentSection].paragraph.title}</h2>
            {
              test.sections[currentSection].paragraph.content.map(v =>
                <div className="paragraph-content">
                  {v}
                </div>
              )
            }
          </div>
          <Section
            onCalTotalQuestion={setNQuestionsInSection}
            sectionId={currentSection}
            questions={test.sections[currentSection].questions}
          />
          <div className="section-control">
            <h4>Section {currentSection + 1}</h4>
            <div className="row">
              <button>
                <i className="fas fa-chevron-left"></i>
                &nbsp;
                Trước
              </button>
              <button>
                Sau
                &nbsp;
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <ScorePopup
            mode={mode}
            score={score}
            class={popupClass}
            onClose={closeScorePopup}
          />
        </div>
        <div className="top">
          <button className="head-home">
            <i className="fas fa-chevron-left"></i>
            &nbsp;
            Trang chủ
          </button>
          <div className="clock">
            <i className="far fa-clock"></i>
            &nbsp;
            55:48
          </div>
          <button className="submit-btn">
            Nộp bài
            &nbsp;
            <i className="fas fa-location-arrow"></i>
          </button>
        </div>
      </>
      :
      <div className="test-page">
        <Loading />
      </div>
  )
}

export { TestPage }