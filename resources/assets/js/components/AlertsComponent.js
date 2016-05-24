import React from 'react';

const AlertsComponent = ({ type, content }) => (
  <div className=`alert-container ${type}`}>
    {content}
  </div>
);
