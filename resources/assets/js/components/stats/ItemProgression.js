import React from 'react';

const ItemProgression = ({ stats, type }) => {
  if (stats) {
    return (
      <div className='item-progression'>
        <div>{type}</div>
        <div>
          <span>Pages read : </span><span> {stats.num_pages_read}</span>
        </div>
        <div>
          <span>Books finished : </span><span> {stats.books_read}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='item-progression'>
      <div>{type}</div>
      <div>No Updates!</div>
    </div>
  );
};

export default ItemProgression;
