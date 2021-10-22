import React from 'react'

function Input(props) {
  let {
    id,
    value,
    type,
    name,
    error,
    placeholder,
    handleChange,
    autoComplete
  } = props;

  let className = error ? 'input-error' : '';
  placeholder = error ? error : placeholder;
  return (
    <input
      id={id}
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      autoComplete={autoComplete}
    />)
}

export default Input