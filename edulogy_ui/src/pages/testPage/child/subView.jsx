import { useEffect, useState } from "react";
import { constants as c } from "../../../constants";

export default function SubView(props) {
  const [timer, setTimer] = useState({
    remain: props.test.time * 60,
    hour: Math.floor(props.test.time / 60),
    minute: Math.floor(props.test.time % 60),
    second: 0
  });

  let {
    test,
    mode,
    score,
    listAnswers,
    trueAnswers,
    currentQuestion,
    handleChangeQuestion,
    handleSubmit,
    handleRedo } = props;

  function calcTimer() {
    if (timer === 0) {
      handleSubmit();
      return;
    }
    let remain = timer.remain - 1;
    let hour = Math.floor(remain / 3600);
    let minute = Math.floor((remain - Math.floor(remain / 3600) * 3600) / 60);
    let second = remain % 60;
    setTimer({
      remain,
      hour: hour < 10 ? '0' + hour : hour,
      minute: minute < 10 ? '0' + minute : minute,
      second: second < 10 ? '0' + second : second
    });
  }

  useEffect(() => {
    if (mode === c.DO_TEST_MODE)
      setTimeout(calcTimer, 1000);
  })

  return (
    <div className="col sub-view">
      <div className="timer">
        <div onClick={handleSubmit} className="submit">
          <i className="fas fa-check"></i> <br />
        Nộp bài
        </div>
        <span>{mode === c.SUBMITED_MODE
          ? `${score} / ${test.questions.length}`
          : `${timer.hour} : ${timer.minute} : ${timer.second}`}</span>
        <div onClick={handleRedo} className="redo">
          <i className="fas fa-redo"></i> <br />
        Làm lại
        </div>
      </div>
      <div className="list-question">
        {
          test.questions.map((v, i) => {
            let customClass = i === currentQuestion ? "round question-active" : "round";
            if (mode === c.DO_TEST_MODE && listAnswers[i] !== undefined)
              customClass += " question-active";
            if (mode === c.SUBMITED_MODE)
              if (listAnswers[i] === trueAnswers[i])
                customClass += " question-true";
              else
                customClass += " question-wrong";
            return (
              <div className="col1-7" key={i}>
                <div className="auto-padding">
                  <div className="square">
                    <button onClick={() => handleChangeQuestion(i)} className={customClass}>{i + 1}</button>
                  </div>
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}