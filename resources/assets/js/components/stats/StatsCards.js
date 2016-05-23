import React from 'react';

const StatsCards = ({ stats, timeView }) => {
  const currentStats = stats && stats[timeView];
  const booksRead = (currentStats) ? currentStats.books_read : '';
  const pagesRead = (currentStats) ? currentStats.num_pages_read : '';
  return (
    <div className='stats-card-row'>
      <div className='home-component-stats-card'>
        <div className='home-component-stats-card-left books-read'>
          <i className='material-icons'>import_contacts</i>
        </div>
        <div className='home-component-stats-card-right books-read'>
          <span className='home-component-stats-card-title'>Books Read</span>
          <span className='home-component-stats-card-content'>{booksRead}</span>
        </div>
      </div>
      <div className='home-component-stats-card'>
        <div className='home-component-stats-card-left pages-read'>
          <i className='material-icons'>insert_drive_file</i>
        </div>
        <div className='home-component-stats-card-right pages-read'>
          <span className='home-component-stats-card-title'>Pages Read</span>
          <span className='home-component-stats-card-content'>{pagesRead}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
