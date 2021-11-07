import { useState, useEffect } from "react";
export default function Timer(props) {
  const [timer, setTimer] = useState({
    remain: props.time * 60,
    hour: Math.floor(props.time / 60) < 10
      ? `0${Math.floor(props.time / 60)}`
      : Math.floor(props.time / 60),
    minute: Math.floor(props.time % 60) < 10
      ? `0${Math.floor(props.time % 60)}`
      : Math.floor(props.time % 60),
    second: "00"
  });
  function calcTimer() {
    if (timer === 0) {
      props.onTimeOut();
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
    setTimeout(calcTimer, 1000);
  });
  return (
    <span className="timer">
      {`${timer.hour} : ${timer.minute} : ${timer.second}`}
    </span>
  )
}