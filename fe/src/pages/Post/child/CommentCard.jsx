export default function CommentCard(props) {
  const { user, content, like, dislike, date } = props;
  return (
    <div className="comment-card">
      <div>
        <div className="avt">
          {user.name[0]}
        </div>
        <div className="action">
          <span>
            <i className="fas fa-caret-up"></i>
          </span>
          <p>{like.length - dislike.length}</p>
          <span>
            <i className="fas fa-caret-down"></i>
          </span>
        </div>
      </div>
      <div>
        <span>{user.name}</span>
        &nbsp;
        <label>vào {date}</label>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
      </div>
    </div>
  )
}