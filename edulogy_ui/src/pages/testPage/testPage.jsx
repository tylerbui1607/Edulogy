import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Nav from '../../common/nav';
import Popup from "../../components/popup";
import Footer from "../../common/footer";
import MainView from "./child/mainView";
import SubView from "./child/subView";
import LoadingPage from "../loadingPage";
import MenuSidebar from "../../common/menuSidebar";
import { testActions } from "../../actions/testActions";
import { showScore } from "../../helper";
import { constants as c } from "../../constants";

function TestPage(props) {

  let test = useSelector(state => state.test.test);
  let dispatch = useDispatch();

  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [score, setScore] = useState(0);
  let [currentPart, setCurrrentPart] = useState(1);
  let [listPart, setListPart] = useState([]);
  let [listAnswers, setListAnswers] = useState([]);
  let [mode, setMode] = useState(c.DO_TEST_MODE);

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
      setMode(c.SUBMITED_MODE);
      showScore(`${s} / ${trueAnswers.length}`);
      setScore(s);
    }
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
  }, [test, dispatch, listPart, props.match.params.id]);

  return (
    <React.Fragment>
      <Nav currentPage={"test"} />
      <div className="test-page">
        {
          test ?
            <React.Fragment>
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
            </React.Fragment>
            : <LoadingPage />
        }
      </div>
      <Footer />
      <Popup />
      <MenuSidebar />
    </React.Fragment>
  )
}

export { TestPage }