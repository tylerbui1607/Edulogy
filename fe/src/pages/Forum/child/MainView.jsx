import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { constants as c } from "../../../constants";
import { postActions as a } from "../../../actions/postActions";
import Filter from "./Filter";
import Post from "./Post";
import Loading from "./Loading";
export default function MainView() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.list);
  useEffect(() => {
    if (posts.status === c.LOADING)
      dispatch(a.getAllPosts());
  }, [])
  return (
    <div className="main-view">
      <Filter />
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
    </div>
  )
}