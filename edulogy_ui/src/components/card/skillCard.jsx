import React from 'react';

function SkillCard(props){
  return (
    <div className="skill-card">
    <div className="img-container">
      <img src={props.skillImg} alt=""/>
    </div>
    <div className="name">{props.skillName}</div>
    <p className="skill-description">{props.description}</p>
  </div>
  )
}

export default SkillCard