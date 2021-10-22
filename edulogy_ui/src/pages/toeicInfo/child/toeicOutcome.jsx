export default function ToeicOutcome(props) {
  return (
    <div className="toeic-outcome" style={{ display: props.display }}>
      <h2 id="toeic-outcome">Nhận kết quả thi TOEIC</h2>
      <p style={{ marginTop: "1em" }}>
        Thời gian nhận kết quả thi TOEIC là <strong>5 ngày làm việc</strong> sau ngày thi (Hà Nội) và 7 ngày làm việc sau ngày thi (Đà Nẵng và TP. HCM), nghĩa là khoảng 10 đến 12 ngày thông thường.
      </p>
      <p style={{ marginTop: "1em" }}>
        Bằng TOEIC có giá trị trong vòng <strong>02 năm kể từ ngày có kết quả. </strong>Trong thời gian đó, bạn có thể dùng nó để bổ sung hồ sơ tìm việc hoặc thậm chí là đi du học (ở một số nước và một số trường nhất định).
      </p>
      <p style={{ marginTop: "1em" }}>
        Sau thời gian 2 năm, bằng TOEIC sẽ không còn hiệu lực. Lúc này bạn có thể thi một lần nữa để được cấp chứng chỉ mới, nếu cảm thấy cần thiết.
      </p>
    </div>
  )
}