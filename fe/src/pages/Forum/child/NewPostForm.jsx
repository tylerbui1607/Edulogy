import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { postActions as a } from '../../../actions/postActions';
import { getCurrentDate } from '../../../helper';
export default function NewPostForm(props) {
  const myInput = useRef(null);
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState({ title: "", content: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesUrl, setSelectedFilesUrl] = useState([]);
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    const fileList = Array.prototype.slice.call(e.target.files);
    setSelectedFiles(fileList);
  };
  function handleSubmit() {
    dispatch(a.createPost({
      ...postInfo,
      date: getCurrentDate()
    }));
  };
  function handleInputChange(name, value) {
    setPostInfo({
      ...postInfo,
      [name]: value
    })
  }
  useEffect(() => {
    if (!selectedFiles.length)
      return;
    let imagesUrl = [];
    imagesUrl = selectedFiles.map((v) => URL.createObjectURL(v));
    setSelectedFilesUrl(imagesUrl);
    return () => URL.revokeObjectURL(imagesUrl);
  }, [selectedFiles]);
  return (
    <div className="modal active">
      <div className="new-post-form">
        <h4>Bài viết mới</h4>
        <input
          onChange={(e) => handleInputChange("title", e.target.value)}
          type="text"
          placeholder="Tiêu đề"
        />
        <div className="quill-container">
          <ReactQuill
            placeholder="Nội dung..."
            value={postInfo.content}
            onChange={(v) => handleInputChange("content", v)} />
        </div>
        <div className="images">
          {
            selectedFilesUrl.length > 0
            && selectedFilesUrl.map((v, i) =>
              <div className="image" key={i}>
                <div className="img-container">
                  <img src={v} alt="" />
                </div>
              </div>
            )
          }
          <button onClick={() => { myInput.current.click() }}>
            <div className="image">
              <div className="img-container">
                <img src="/img/add_img.png" alt="" />
              </div>
            </div>
          </button>
          <input
            type="file"
            ref={myInput}
            multiple={true}
            onChange={handleFileSelect}
            style={{ display: "none" }}
            accept="image/jpeg, image/jpg, image/png"
          />
        </div>
        <div className="action">
          <button id="submit-btn" onClick={handleSubmit}>Đăng bài</button>
          <button id="cancel-btn" onClick={props.onClose}>Hủy</button>
        </div>
      </div>
    </div>
  )
}