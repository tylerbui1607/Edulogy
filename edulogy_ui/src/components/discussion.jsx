import React, { useRef, useState } from 'react';
import DiscussionDetailCard from './card/discussionDetailCard';
import DiscussionForm from './form/discussionForm';
import FloatingButton from './floatingButton';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BoxLoading } from 'react-loadingg';
import { IoIosClose } from "react-icons/io";
import { MdCameraAlt } from "react-icons/md";
import { useSelector } from 'react-redux';

function Discussion() {
  const { id } = useParams();

  const user = useSelector(store => store.authentication.user);

  const replyTypingRef = useRef(null);
  const replyCardRef = useRef(null);

  const discussionFormRef = useRef(null);
  const floatingButtonRef = useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);

  const { data: problem, isLoading, isError, refetch } = useQuery(['discussion', id], async () => {
    const response = await axios.get(`http://localhost:3000/api/problems/${id}`);
    // console.log(response.data)
    return response.data;
  });

  const getImagesUrl = async () => {
    let imagesUrl = [];

    for (const image of selectedImages) {
      var form = new FormData();
      form.append('key', '92375a8cb3c4edce26332a38805e6251');
      form.append('image', image);

      const response = await axios.post('https://api.imgbb.com/1/upload', form);
      imagesUrl.push(response.data.data.image.url);
    }

    return imagesUrl;
  }

  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleOnReply();
    }
  }

  const handleOnReply = async () => {
    const content = replyTypingRef.current.innerText.trim();

    if (!content) return;

    const images = await getImagesUrl();

    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }

    const data = {
      content: content,
      imgs: images
    }

    console.log(data);

    setSelectedImages([]);
    replyTypingRef.current.innerText = '';
    replyCardRef.current.classList.remove('active');

    axios.post(`http://localhost:3000/api/problems/reply/${id}`, data, config)
      .then(response => {
        console.log(response.data);
        refetch();
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleFloatingButtonClick = () => {
    if (discussionFormRef.current.classList.contains('active')) {
      floatingButtonRef.current.classList.remove('active');
      discussionFormRef.current.classList.remove('active');
    } else {
      floatingButtonRef.current.classList.add('active');
      discussionFormRef.current.classList.add('active');
    }
  }

  const handleCancelClick = () => {
    replyTypingRef.current.innerText = '';
    replyCardRef.current.classList.remove('active');
  }


  const handleReplyClick = () => {
    replyCardRef.current.classList.add('active');
    replyTypingRef.current.focus();
  }

  const handleImagesChoose = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const expectedImages = [...selectedImages].concat(fileArray);
      setSelectedImages(expectedImages);
    }
  }

  const handleRemoveImageClick = (image) => {
    const expectedImages = selectedImages.filter(img => img !== image);
    setSelectedImages(expectedImages);
  }

  return (
    <div className="discussion">
      <div className="section-wrapper">
        <DiscussionForm refetch={refetch} ref={discussionFormRef} />

        <div className="discussions-area">
          {isLoading &&
            <div id="loading-effect">
              <BoxLoading color='#00949e' />
            </div>
          }
          {isError && <div style={{ lineHeight: '50vh', textAlign: 'center' }}>Something went wrong</div>}
          {problem && <div className="discussions-wrapper">
            <h3 className="title">{problem.doc.title}</h3>
            <DiscussionDetailCard
              discussion={problem.doc}
              type='problems'
              refetch={refetch}
              handleReplyClick={handleReplyClick}
            />

            {user && <div className="reply-card" ref={replyCardRef}>
              <div
                className="reply-typing"
                contentEditable="true"
                data-placeholder="Nhập câu trả lời..."
                onKeyDown={handleEnterPress}
                ref={replyTypingRef}
              />

              <div className="under-reply">
                <div className="uploaded-images">
                  {selectedImages.map((image) => (
                    <span key={image.name} className="uploaded-img">
                      <span className="img-name">{image.name}</span>
                      <IoIosClose className="remove-img-icon" onClick={() => handleRemoveImageClick(image)} />
                    </span>
                  ))}
                </div>

                <div className="btn-group">
                  <div className="cancel-btn" onClick={handleCancelClick}>Hủy</div>
                  <div className="submit-btn" onClick={handleOnReply}>Trả lời</div>
                </div>
              </div>

              <input type="file" multiple name="reply-image" id="reply-image" accept="image/*" onChange={handleImagesChoose} />
              <label htmlFor="reply-image" className="image-upload">
                <MdCameraAlt className="image-upload-icon" />
              </label>
            </div>}

            <div className="replies-quantity">{problem.doc.comments.length} câu trả lời</div>

            {problem.doc.comments.map(comment => (
              <DiscussionDetailCard key={comment._id} discussion={comment} type='comments' refetch={refetch} />
            ))}
          </div>}
        </div>
      </div>

      <FloatingButton onClick={handleFloatingButtonClick} ref={floatingButtonRef} />
    </div>
  );
}

export default Discussion;