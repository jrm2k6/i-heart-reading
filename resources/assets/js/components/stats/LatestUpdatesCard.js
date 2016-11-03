import React, { Component } from 'react';
import moment from 'moment';

class LatestUpdatesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEndIndex: 10
    };
  }

  generateUpdatesRow() {
    const { currentEndIndex } = this.state;
    return this.props.latestUpdates
      .slice(0, currentEndIndex)
      .map((update, index) => {
        const bookTitle = update.assignment.book.title;
        const numPages = update.num_pages_read;
        const isRead = update.mark_book_read;
        const when = moment(update.created_at).fromNow();

        const properties = { bookTitle, numPages, isRead, when };

        return <LatestUpdateRow key={index} properties={properties} />
      });
  }

  render() {
    const { latestUpdates } = this.props;
    const rows = (latestUpdates && latestUpdates.length > 0)
      ? this.generateUpdatesRow(latestUpdates)
      : 'No Updates!';

    return (
      <div className='latest-updates'>
        <div className='latest-updates-title'>
          My latest updates
        </div>
        <div className='latest-updates-content'>
          {rows}
        </div>
        <div className='latest-updates-more'>
          <button
            className='latest-updates-more-btn'
            onClick={() => {
              if (this.state.currentEndIndex < latestUpdates.length) {
                this.setState({ currentEndIndex: this.state.currentEndIndex + 10 });
              }
            }}
            disabled={!latestUpdates || this.state.currentEndIndex >= latestUpdates.length}
          >
            See More
          </button>
        </div>
      </div>
    );
  }
}

const LatestUpdateRow = ({ properties }) => {
  let text = '';
  if (properties.isRead) {
    text = `You marked ${properties.bookTitle} as read.`;
  } else {
    text = `You read ${properties.numPages} pages of ${properties.bookTitle}.`;
  }

  return (
    <div className='update-row'>
      <span className='update-row-content'>{text}</span>
      <span className='update-row-readable-time'>({properties.when})</span>
    </div>
  );
}

export default LatestUpdatesCard;
