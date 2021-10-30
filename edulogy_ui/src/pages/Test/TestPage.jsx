import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { constants as c } from "../../constants";
import { testActions } from "../../actions/testActions";
import SubView from "./child/SubView";
import MainView from "./child/MainView";
import ScorePopup from './child/ScorePopup';
import Loading from '../../components/Common/Loading';
function TestPage(props) {
  let dispatch = useDispatch();
  let test = useSelector(state => state.test.test);
  let [score, setScore] = useState(0);
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
  let trueAnswers = useMemo(() => getTrueAnswers(test), [test]);
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
    if (mode === c.DO_TEST_MODE) {
      let s = 0;
      for (let i = 0; i < trueAnswers.length; i++)
        if (trueAnswers[i] === listAnswers[i])
          s++;
      setScore(s);
      setPopupClass("active");
      setMode(c.SUBMITED_MODE);
    }
  }
  function closeScorePopup() {
    setPopupClass("")
  }
  useEffect(() => {
    if (!test)
      dispatch(testActions.getTestById(props.match.params.id))
    else {
      document.title = test.name;
      if (!listPart.length) {
        let lpart = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < test.questions.length; i++) {
          if (lpart[test.questions[i].part] === -1) {
            lpart[test.questions[i].part] = i;
          }
        }
        setListPart(lpart);
        setCurrrentPart(test.questions[0].part)
      }
    }
  }, [test]);
  return (
    test ?
      <div className="test-page">
        <MainView
          test={test}
          mode={mode}
          listPart={listPart}
          listAnswers={listAnswers}
          currentPart={currentPart}
          currentQuestion={currentQuestion}
          handleSubmit={handleSubmit}
          handleAnswers={handleAnswers}
          handleChangePart={handleChangePart}
          handleChangeQuestion={handleChangeQuestion}
        />
        <SubView
          test={test}
          mode={mode}
          score={score}
          trueAnswers={trueAnswers}
          listAnswers={listAnswers}
          currentQuestion={currentQuestion}
          handleSubmit={handleSubmit}
          handleRedo={handleRedo}
          handleChangeQuestion={handleChangeQuestion}
        />
        <ScorePopup
          mode={mode}
          score={score}
          class={popupClass}
          onClose={closeScorePopup}
        />
      </div>
      :
      <div className="test-page">
        <Loading />
      </div>
  )
}

export { TestPage }