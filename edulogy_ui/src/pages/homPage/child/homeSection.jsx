import React from "react";

import TestCard from "../../../components/card/testCard";

export default function HomeSection(props) {
  console.log(props.tests);
  return (
    <React.Fragment>
      <div className="home_section">
        <div className="section_container">
          {
            props.tests.map((v, i) => <TestCard key={i} img={v.img} id={v._id} name={v.name} time={v.time} level={v.level} />)
          }
        </div>
      </div>
    </React.Fragment>
  )
}