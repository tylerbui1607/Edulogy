import React from 'react';

import TestCard from './card/testCard';
function NewTest() {
  return (
    <div className="new-test">
      <h3 className="center-text">ĐỀ THI VỪA CẬP NHẬT</h3>
      <div className="slider-container">
        <TestCard
          src="/img/ets.png"
          name={"ETS 2021 ĐỀ 1"} />
      </div>
    </div>
  )
}

export default NewTest;
