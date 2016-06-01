import React from 'react';

const AlertsComponent = ({ type, content }) => {
  const _className = `alert-container ${type}`;
  return (
    <div className={_className}>
      {content}
    </div>
  );
}

export default AlertsComponent;
