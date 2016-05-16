import React from 'react';

export default class InteractiveChartLegend extends React.Component {
  getBooksFinishedRow() {
    if (this.props.timeView === 'yearly') {
      return (
        <div className='legend-row'>
          <div className='legend-square num-books-read'>
          </div>
          <span className='legend-caption'>
            Books Finished
          </span>
        </div>
      );
    }

    return null;
  }

  render() {
    const booksFinishedRow = this.getBooksFinishedRow();
    return (
      <div className='home-component-interactive-chart-legend'>
        {booksFinishedRow}
        <div className='legend-row'>
          <div className='legend-square num-pages-read'>
          </div>
          <span className='legend-caption'>
            Pages Read
          </span>
        </div>
        <div className='legend-row'>
          <div className='legend-square remaining'>
          </div>
          <span className='legend-caption'>
            Still remaining
          </span>
        </div>
      </div>
    );
  }
}
