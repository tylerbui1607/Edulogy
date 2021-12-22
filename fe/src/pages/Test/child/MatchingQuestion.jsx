export default function MatchingQuestion(props) {
  const { content, answers, trueAnswers, explain, nQuestions } = props;
  function createContentRow(c, i) {
    return (
      <div className="row">
        <div className="number">
          {nQuestions.from + i}
        </div>
        <select answers_for={i}>
          {
            answers.map(v => <option value={v}>{v}</option>)
          }
        </select>
        <label>{c}</label>
      </div>
    )
  }
  return (
    <div className="question matching">
      <h3>
        Questions {nQuestions.from}-{nQuestions.to}
      </h3>
      <div className="guild">
        The text has 8 paragraphs (A - H). Which paragraph does each of the following headings best fit?
      </div>
      {
        content.map((v, i) => createContentRow(v, i))
      }
    </div>
  )
}