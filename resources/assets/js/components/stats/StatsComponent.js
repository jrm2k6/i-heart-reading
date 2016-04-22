import React from 'react';

const StatsComponent = ({ numPagesReadYear }) => {
  const progression = (numPagesReadYear) ?
    Math.round(parseInt(numPagesReadYear, 10) / 12250 * 100) :
    0;
  return (
    <div className='item-objective'>
      You are at {progression}% of your yearly objective ({numPagesReadYear} of 12250)!
    </div>
  )
};

export default StatsComponent;
