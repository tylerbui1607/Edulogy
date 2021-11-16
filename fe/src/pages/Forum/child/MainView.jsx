import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { constants as c } from "../../../constants";
import { postActions as a } from "../../../actions/postActions";
import Post from "./Post";
import Loading from "./Loading";
import NewPostForm from "./NewPostForm";
export default function MainView() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.list);
  const [currentForm, setCurrentForm] = useState("none");
  const forms = {
    none: <></>,
    post: <NewPostForm onClose={handleCloseForm} />
  };
  function handleCloseForm() {
    setCurrentForm("none");
  }
  useEffect(() => {
    if (posts.status === c.LOADING)
      dispatch(a.getAllPosts());
  }, [])
  return (
    <div className="main-view">
      <div className="filter">
        <button
          onClick={() => setCurrentForm("post")}
        >
          Bài viết mới &nbsp;
          <i className="fas fa-plus"></i>
        </button>
        <button>
          <i className="fas fa-sliders-h"></i> &nbsp;
          Bộ lọc
        </button>
      </div>
      <div className="main-view__post-container">
        {
          posts.status === c.LOADING
            ? <Loading />
            :
            <>
              {
                posts.data.map((v) =>
                  <Post key={v._id} {...v} />
                )
              }
            </>
        }
      </div>
      {forms[currentForm]}
    </div>
  )
}