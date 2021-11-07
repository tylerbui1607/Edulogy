export default function ToeicLocation(props) {
  const hcmLocations = [
    {
      name: 'Văn phòng IIG Việt Nam chi nhánh Hồ Chí Minh',
      address: 'Tầng 1, Tháp 1, Tòa nhà The Sun Avenue, Số 28 Mai Chí Thọ, P. An Phú, Q.2, TP. HCM'
    },
    {
      name: 'TT Ngoại ngữ ĐH Bách Khoa, TP HCM',
      address: 'Tòa nhà C6, TT Ngọai ngữ trường ĐH Bách Khoa HCM 268 Lý Thường Kiệt, Q.10, TP. HCM'
    },
    {
      name: 'Trung Tâm Anh Văn Hội Việt Mỹ (VUS)',
      address: 'Số 72 BIS Võ Thị Sáu, Quận 3, TP. HCM'
    },
    {
      name: 'Trung tâm Anh ngữ giao tiếp quốc tế Leecam',
      address: '104 Cao Thắng, Phường 4, Q.3, TP. HCM'
    },
    {
      name: 'ĐH Kinh tế Tp Hồ Chí Minh',
      address: '59C Nguyễn Đình Chiểu, Quận 3, TP. HCM'
    },
    {
      name: 'ĐH Ngân Hàng - STN 13818 A',
      address: '39 Hàm Nghi, Quận 1, TP. HCM'
    },
    {
      name: 'Đại học Khoa học Tự nhiên – ĐH Quốc gia TP HCM',
      address: 'Số 227 Nguyễn Văn Cừ, Quận 5, TP.HCM'
    },
  ];

  const hnLocations = [
    {
      name: 'Văn phòng IIG Việt Nam 75 Giang Văn Minh (Chỉ tổ chức thi)',
      address: '75 Giang Văn Minh, Q. Ba Đình, Hà Nội'
    },
    {
      name: 'VP IIG Academy Hà Nội',
      address: 'Tầng 3 Trung Yên Plaza, Số 1 Trung Hòa, Cầu Giấy, Hà Nội'
    },
    {
      name: 'Trường Đại học Kinh tế Quốc dân',
      address: 'Số 207 đường Giải Phóng, Hai Bà Trưng, Hà Nội'
    },
  ];

  const dnLocations = [
    {
      name: 'Văn phòng IIG Việt Nam chi nhánh Đà Nẵng',
      address: 'Số 266 đường Trần Phú, Quận Hải Châu, Thành phố Đà Nẵng, Việt Nam'
    },
  ];
  return (
    <div className="toeic-location" style={{ display: props.display }}>
      <h2 id="toeic-location">Thi TOEIC ở đâu ?</h2>
      <h3 id="toeic-loc-hcm">Tại TP. Hồ Chí Minh</h3>
      <ol>
        {hcmLocations.map((location, index) => {
          return (
            <li key={index}>
              <b>{location.name}</b>
              <span>{location.address}</span>
            </li>
          );
        })}
      </ol>

      <h3 id="toeic-loc-hn">Tại Hà Nội</h3>
      <ol>
        {hnLocations.map((location, index) => {
          return (
            <li key={index}>
              <b>{location.name}</b>
              <span>{location.address}</span>
            </li>
          );
        })}
      </ol>

      <h3 id="toeic-loc-dn">Tại Đà Nẵng</h3>
      <ol>
        {dnLocations.map((location, index) => {
          return (
            <li key={index}>
              <b>{location.name}</b>
              <span>{location.address}</span>
            </li>
          );
        })}
      </ol>
    </div>
  )
}