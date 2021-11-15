export default function TrendingPost(props) {
  const { title, content, user } = props;
  return (
    <div className="trending-post show_flex">
      <div className="trending-post__avt">
        {user.name[0]}
      </div>
      <div className="trending-post__info">
        <h4>{title}</h4>
        <p>{content}</p>
        <div className="show_flex">
          <span><i className="far fa-calendar-alt"></i></span>
          &nbsp;
          <label>15/11/2021</label>
        </div>
      </div>
    </div>
  )
}