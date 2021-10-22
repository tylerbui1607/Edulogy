import React, { useState, useEffect } from 'react';
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import axios from 'axios';
import { ImReply } from "react-icons/im";
import { useSelector } from 'react-redux';

const badgeFrame = {
  pawn: '/img/badge-2.png',
  knight: '/img/badge-3.png',
  bishop: '/img/badge-1.png'
}

function DiscussionDetailCard({ discussion, type, refetch, handleReplyClick }) {
  const user = useSelector(store => store.authentication.user);
  console.log(discussion)

  const [upVoteClassName, setUpVoteClassName] = useState('up-vote');
  const [downVoteClassName, setDownVoteClassName] = useState('down-vote');

  const handleUpVote = () => {
    if (upVoteClassName.includes('disabled')) return;

    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }

    axios.get(`http://localhost:3000/api/${type}/like/${discussion._id}`, config)
      .then(response => {
        console.log('da like', response.data);
        refetch();
      })
      .catch(error => console.log(error))
  }

  const handleDownVote = () => {
    if (downVoteClassName.includes('disabled')) return;

    console.log('down');
    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }

    axios.get(`http://localhost:3000/api/${type}/dislike/${discussion._id}`, config)
      .then(response => {
        console.log('da dislike', response.data);
        refetch();
      })
      .catch(error => console.log(error))
  }

  const disableVote = () => {
    if (!upVoteClassName.includes('disabled')) setUpVoteClassName(prevName => prevName + ' disabled');
    if (!downVoteClassName.includes('disabled')) setDownVoteClassName(prevName => prevName + ' disabled');
  }

  useEffect(() => {
    if (user && user._id !== discussion.user._id) {
      setUpVoteClassName('up-vote');
      setDownVoteClassName('down-vote');

      if (discussion.like.includes(user._id)) {
        setUpVoteClassName(prevName => prevName + ' pressed');
        disableVote();
      } else if (discussion.dislike.includes(user._id)) {
        setDownVoteClassName(prevName => prevName + ' pressed');
        disableVote();
      }
    } else {
      disableVote();
    }
  }, [discussion.like, discussion.dislike, user]);

  return (
    <div className="discussion-detail-card">
      <div className="voting-area">
        <RiArrowUpSFill className={upVoteClassName} onClick={handleUpVote} />
        <div className="vote-counter">{discussion.like.length - discussion.dislike.length}</div>
        <RiArrowDownSFill className={downVoteClassName} onClick={handleDownVote} />
      </div>

      <div className="comment-content">
        {discussion.content}

        <div className="images-content">
          {discussion.imgs.map(img => (
            <img src={img} alt="" />
          ))}
        </div>

        {user && type === 'problems' && <div className="reply">
          <ImReply className="reply-btn" onClick={handleReplyClick} />
        </div>}
      </div>

      <div className="author">
        <div className={'author-avatar ' + discussion?.user?.badge}>
          {discussion.user.name.split(" ").pop().charAt(0).toUpperCase()}
          {discussion?.user?.badge && <img src={badgeFrame[discussion.user?.badge]} alt="" className="author-badge-frame" />}
        </div>
        <div className="author-name">{discussion.user.name.split(" ").pop()}</div>
      </div>
    </div>
  );
}

export default DiscussionDetailCard;