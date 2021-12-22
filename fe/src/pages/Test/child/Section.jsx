import { useEffect, useMemo } from "react";
import { constants as c } from "../../../constants";
import MatchingQuestion from "./MatchingQuestion";
export default function Section(props) {
  let { sectionId, questions } = props;
  let nQuestions = useMemo(() => {
    return questions.reduce((rs, v) => {
      let nSubQuestions = 1;
      if (v.type === c.MATCHING_PARAGRAPH)
        nSubQuestions = v.content.length;
      if (v.type === c.MULTIPLE_CHOICE)
        nSubQuestions = v.trueAnswers.length;
      if (!rs[v.type])
        rs[v.type] = {
          from: rs.total + 1,
          to: rs.total + nSubQuestions
        }
      else
        rs[v.type] = {
          ...rs[v.type],
          to: rs.total + nSubQuestions
        }
      rs.total += nSubQuestions;
      return rs
    }
      ,
      { total: 0 }
    );
  }, [props.sectionId])
  console.log(nQuestions)
  let questionCreator = {
    [c.MATCHING_PARAGRAPH]: (q) => <MatchingQuestion {...q} nQuestions={nQuestions[c.MATCHING_PARAGRAPH]} />
  }
  useEffect(() => { }, [])
  return (
    <div className="section">
      <h4>Section {sectionId + 1}: QUESTIONS 1-13</h4>
      {
        questions.map(v => v.type === c.MATCHING_PARAGRAPH && questionCreator[v.type](v))
      }
    </div>
  )
}