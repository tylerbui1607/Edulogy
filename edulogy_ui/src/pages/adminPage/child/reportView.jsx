import InfoCard from "./infoCard"

export default function ReportView(props) {
  return (
    <div className="report-view">
      <InfoCard
        icon="far fa-id-card"
        title="Học viên"
        number={props.users}
        color="rgb(189, 124, 113)"
      />
      <InfoCard
        icon="far fa-file-alt"
        title="Đề thi"
        number={props.tests}
        color="rgb(77, 189, 133)"
      />
      <InfoCard
        icon="fas fa-tasks"
        title="Câu hỏi"
        number={props.questions}
        color="rgb(77, 185, 189)"
      />
      <InfoCard
        icon="fas fa-star-half-alt"
        title="Đánh giá"
        number="4.2"
        color="rgb(206, 207, 113)"
      />
    </div>
  )
}