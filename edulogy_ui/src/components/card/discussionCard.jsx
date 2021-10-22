import React from 'react';
import { Link } from 'react-router-dom';

const badgeFrame = {
  pawn: '/img/badge-2.png',
  knight: '/img/badge-3.png',
  bishop: '/img/badge-1.png'
}

function DiscussionCard({ discussion }) {
  return (
    <div className="discussion-card">
      <div className="author-and-replies">
        <div className={'author-avatar ' + discussion?.user?.badge}>
          {discussion.user.name.split(" ").pop().charAt(0).toUpperCase()}
          {discussion?.user?.badge && <img src={badgeFrame[discussion.user?.badge]} alt="" className="author-badge-frame" />}
        </div>
        <div className="author-name">{discussion.user.name.split(" ").pop()}</div>
        <div className="reply-quantity">{discussion.comments.length}</div>
        <div className="reply-quantity-suffix">trả lời</div>
      </div>

      <div className="content-detail">
        <Link to={`chi-tiet-thao-luan/${discussion._id}`} className="discussion-title">{discussion.title}</Link>
        <div className="discussion-content">
          {discussion.content}
        </div>
      </div>
    </div>
  );
}

export default DiscussionCard;