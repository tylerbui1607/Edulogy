export default function Post(props) {
  const { title, dislike, like, imgs, content, view, user, comments } = props;
  return (
    <div className="post">
      <div className="show_flex w100">
        <div className="post__avt" >
          {user.name[0]}
        </div>
        <div className="post__main-info">
          <h4>{title}</h4>
          <div className="show_flex">
            <div className="show_flex">
              <p>Tác giả: </p>
              &nbsp;
              <span>{user.name}</span>
            </div>
            <div className="show_flex">
              <span><i className="far fa-calendar-alt"></i></span>
              &nbsp;
              <p>15/11/2021</p>
            </div>
          </div>
        </div>
        <div className="show_flex post__counting">
          <div>
            <i className="fas fa-comments"></i>
            &nbsp; {comments.length}
          </div>
          <div>
            <i className="fas fa-eye"></i>
            &nbsp; {view}
          </div>
          <div>
            <i className="fas fa-thumbs-up"></i>
            &nbsp; {like.length - dislike.length}
          </div>
        </div>
      </div>
      <div className="post__preview">
        {content}
      </div>
    </div>
  )
}