import { constants as c } from "../../../constants";

export default function MainView(props) {
  let {
    test,
    mode,
    currentPart,
    currentQuestion,
    listPart,
    handleSubmit,
    handleAnswers,
    handleChangePart,
    handleChangeQuestion,
    listAnswers } = props;

  let answersMark = ["A", "B", "C", "D"];
  let partDirection = ["",
    "Look at the picture and listen to the sentences. Choose the sentence that best describes the picture:",
    "Listen to the question and the three responses. Choose the response that best answers the question:",
    "Listen to the dialogue. Then read each question and choose the best answer:",
    "Listen to the talk. Then read each question and choose the best answer:",
    "Choose the word that best completes the sentence:",
    "Choose the word or phrase that best completes the blanks:",
    "Read the passage and choose the correct answer:"]

  return (
    <div className="col main-view">
      <h2 className="test-name">{test.name}</h2>
      <div className="list-part">
        {
          listPart.map((v, i) => {
            let customClass = i === currentPart ? "part-active" : "";
            if (v !== -1) {
              return <div onClick={() => handleChangePart(i)} className={customClass} key={i}>{`Part ${i}`}</div>
            }
            return null
          })
        }
      </div>
      <div className="part-direction">{partDirection[currentPart]}</div>
      { //display content if part is 5 or user already submit
        (test.questions[currentQuestion].content && test.questions[currentQuestion].part > 4)
          || (mode === c.SUBMITED_MODE)
          ?
          <div className="content-display">{test.questions[currentQuestion].content}</div>
          :
          <div></div>
      }
      <div className="question-display col">
        {test.questions[currentQuestion].img ? <img src={test.questions[currentQuestion].img} alt="Questions 1" /> : <div></div>}
        {test.questions[currentQuestion].script ? <audio src={test.questions[currentQuestion].script} controls="play"></audio> : <div></div>}
        <span>{`Question ${currentQuestion + 1}`}</span>
        <div className="answers-display">
          {
            test.questions[currentQuestion].answers.map((v, i) => {
              let a_content = test.questions[currentQuestion].part > 2 || mode === c.SUBMITED_MODE ? v.content : "";
              let customClassBtn = listAnswers[currentQuestion] === i ? "answer-active" : "";
              let customClassSpan = "";
              if (mode === c.SUBMITED_MODE && v.isTrue)
                customClassSpan = "true-answer";
              return (
                <div className="answer" key={i}>
                  <button className={customClassBtn} onClick={() => handleAnswers(i)} >{answersMark[i]}</button>
                  <span className={customClassSpan}>{a_content}</span>
                </div>
              )
            })
          }
        </div>
        {currentPart === 5 && mode === c.SUBMITED_MODE &&
          <div className="explanation-display">
            <span>Giải thích:</span>
            {
              test.questions[currentQuestion].explanation.split("\\n").map((v, i) => <div key={i}>{v}</div>)
            }
          </div>
        }
      </div>
      <div className="action">
        <button onClick={() => handleChangeQuestion(currentQuestion - 1)} id="prevBtn"><i className="fas fa-angle-double-left"></i></button>
        <button onClick={handleSubmit} id="submitBtn">Nộp bài</button>
        <button onClick={() => handleChangeQuestion(currentQuestion + 1)} id="nextBtn"><i className="fas fa-angle-double-right"></i></button>
      </div>
    </div>
  )
}