import React from 'react';

const FloatingButton = React.forwardRef(({ onClick }, ref) => {
  return (
    <label htmlFor="clear-btn" className="floating-button" onClick={onClick} ref={ref}>
      +
    </label>
  );
});

export default FloatingButton;