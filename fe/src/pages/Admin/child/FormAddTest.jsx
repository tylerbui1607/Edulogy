import { useDispatch } from "react-redux";
import { useState } from "react";
import { xlsxToJson } from "../../../helper";
import { constants as c } from "../../../constants";
import { testActions as a } from "../../../actions/testActions";
import { appActions } from "../../../actions/appActions";
export default function AddTestForm() {
  const dispatch = useDispatch();
  const imgLink = {
    "full": "https://i.ibb.co/MpmBCQ3/testbn1.png",
    "mini": "https://i.ibb.co/9HFWnb2/testbn.jpg",
    "part1": "https://i.ibb.co/1bk7ZDC/hqdefault.jpg",
    "part2": "https://i.ibb.co/4RPcTzq/p2bn.png",
    "part5": "https://i.ibb.co/PhJ6rCS/14900.png",
    "part6": "https://i.ibb.co/PhJ6rCS/14900.png",
    "part7": "https://i.ibb.co/PhJ6rCS/14900.png"
  }
  const [questions, setQuestions] = useState([]);
  const [info, setInfo] = useState({});
  async function handleFileSelect(e) {
    var rs = await xlsxToJson(e.target.files[0]);
    setQuestions(rs);
  }
  function handleSubmit() {
    if (!questions || !questions.length) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, "Vui lòng cung cấp đầy đủ thông tin"));
      return;
    }
    let qs = questions.map(v => {
      let answers = [];
      if (v.A)
        answers.push({
          content: v.A,
          isTrue: v.answer === "A"
        });
      if (v.B)
        answers.push({
          content: v.B,
          isTrue: v.answer === "B"
        });
      if (v.C)
        answers.push({
          content: v.C,
          isTrue: v.answer === "C"
        });
      if (v.D)
        answers.push({
          content: v.D,
          isTrue: v.answer === "D"
        });
      return {
        content: v.content,
        part: v.part,
        explanation: v.explanation,
        img: v.image,
        script: v.script,
        answers
      }
    })
    console.log({
      ...info,
      questions: qs,
      img: imgLink[info.type]
    });
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }))
    dispatch(a.addTest({
      ...info,
      questions: qs,
      img: imgLink[info.type]
    }))
  }
  function handleInputChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={(e) => { e.preventDefault() }} id="form">
      <h3>Tạo test mới</h3>
      <label htmlFor="name">Tên test:</label>
      <input
        onChange={handleInputChange}
        value={info.name}
        autoComplete="off"
        type="text"
        name="name"
        id="name"
      />
      <label htmlFor="type">Loại</label>
      <select name="type" id="type" onChange={(e) => {
        setInfo({
          ...info,
          type: e.target.selectedOptions[0].value
        })
      }}>
        <option value="mini">Mini</option>
        <option value="part1">Part I</option>
        <option value="part2">Part II</option>
        <option value="part5">Part V</option>
        <option value="part6">Part VI</option>
        <option value="part7">Part VII</option>
      </select>
      <div className="row">
        <label>Level</label>
        <div>
          <div className="row">
            <input
              type="checkbox"
              checked={info.level === "250-500"}
              onChange={handleInputChange}
              name="level"
              id="250-500"
              value="250-500"
            />
            <label htmlFor="250-500">250 - 500</label>
          </div >
          <div className="row">
            <input
              type="checkbox"
              checked={info.level === "500-750"}
              onChange={handleInputChange}
              name="level"
              id="500-750"
              value="500-750"
            />
            <label htmlFor="500-750">500 - 750</label>
          </div>
          <div className="row">
            <input
              type="checkbox"
              checked={info.level === "750-990"}
              onChange={handleInputChange}
              name="level"
              id="750-990"
              value="750-990"
            />
            <label htmlFor="750-990">750 - 990</label>
          </div>
        </div>
      </div>
      <label htmlFor="time">Thời gian làm bài: </label>
      <input
        onChange={handleInputChange}
        value={info.times}
        type="number"
        name="time"
        id="time"
      />
      <div className="row">
        <label htmlFor="file">Test file</label>
        <input
          onChange={handleFileSelect}
          type="file"
          name="file"
          id="file"
        />
      </div>
      <button onClick={handleSubmit} id="btnSubmit">Lưu</button>
    </form>
  )
}