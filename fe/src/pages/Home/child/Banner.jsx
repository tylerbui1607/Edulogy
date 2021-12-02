import React from 'react';

function Banner() {
  return (
    <div className="banner">
      <div className="img-container">
        <img className="desktop-display" src="/img/b.png" alt="" />
        <img className="mobile-display" src="/img/banner3.png" alt="" />
      </div>
      <div className="category">
        <a href="/de-thi?type=mini">Mini test</a>
        <a href="/de-thi?type=part1" > <label>Part I:</label> Hình ảnh</a>
        <a href="/de-thi?type=part2" > <label>Part II:</label> Hội thoại</a>
        <a href="/de-thi?type=part5" > <label>Part V:</label> Điền khuyết</a>
        <a href="/de-thi?type=part6" > <label>Part VI:</label> Điền từ</a>
        <a href="/de-thi?type=part7" > <label>Part VII:</label>  Điền khuyết</a>
      </div>
    </div>
  )
}

export default Banner