import { constants as c } from "../../../constants";
export default function ScorePopup(props) {
  const { score, total } = props;
  return (
    <div className={`modal ${props.class}`} id="modal">
      <div className="score-popup" id="scorePopup">
        Kết quả: <br />
        <span id="scoreDisplay">
          {`${score}/${total}`}
        </span>
        <div
          onClick={props.onClose}
          id="closeScoreBtn">
          Xem đáp án
        </div>
      </div>
    </div>
  )
}