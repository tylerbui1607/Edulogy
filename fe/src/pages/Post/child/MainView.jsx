import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { constants as c } from "../../../constants";
import { postActions as a } from "../../../actions/postActions";
import Loading from "./Loading";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
export default function MainView(props) {
  const dispatch = useDispatch();
  const info = useSelector(state => state.post.info);
  useEffect(() => {
    if (info.status === c.LOADING)
      dispatch(a.getPostById(props.id));
  }, [])
  return (
    <div className="main-view show_flex">
      {
        info.status === c.SUCCESS
          ?
          <>
            <div>
              <div className="main-view__post__avt">
                {info.data.user.name[0]}
              </div>
              <div className="main-view__post__action">
                <span>
                  <i className="fas fa-caret-up"></i>
                </span>
                <p>
                  {info.data.like.length - info.data.dislike.length}
                </p>
                <span>
                  <i className="fas fa-caret-down"></i>
                </span>
              </div>
            </div>
            <div>
              <h3>{info.data.title}</h3>
              <div className="show_flex">
                <span>Tác giả: </span>
                &nbsp;
                <label>{info.data.user.name}</label>
                &nbsp;
                <span>vào {info.data.date}</span>
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: info.data.content }}>
              </div>
              <div className="main-view__comments">
                <h4>{info.data.comments.length} Bình luận</h4>
                <CommentInput id={props.id} />
                {
                  info.data.comments.map((v) => <CommentCard {...v} key={v._id} />)
                }
              </div>
            </div>
          </>
          : <Loading />
      }
    </div>
  )
}