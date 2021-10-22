import React from 'react';

import SkillCard from '../../../components/card/skillCard';

function ListSkill() {
  return (
    <div className="skill">
      <SkillCard
        skillName="Linh hoạt"
        skillImg="/img/online.png"
        description="Edulogy là nền tảng học tiếng anh trực tuyến giúp học viên có kế hoạch linh hoạt, chủ động."
      />
      <SkillCard
        skillName="Miễn phí"
        skillImg="/img/money.png"
        description="Edulogy hoàn toàn miễn phí chúng tôi cam kết không thu bất kỳ loại chi phí nào từ học viên."
      />
      <SkillCard
        skillName="Cộng đồng"
        skillImg="/img/member.png"
        description="Edulogy có lượng người dùng đông đảo, học viên có thể hỗ trợ lẫn nhau trên các diễn đàng."
      />
      <SkillCard
        skillName="Tiến độ"
        skillImg="/img/record.png"
        description="Edulogy cung cấp chức năng ghi lại thông tin làm bài giúp kiểm tra tiến độ học của các thành viên."
      />
    </div>
  )
}

export default ListSkill