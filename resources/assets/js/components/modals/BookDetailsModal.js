import React, { Component } from 'react';

class BookDetailsModal extends Component {
  render() {
    const { suggestion, onClick } = this.props;
    const { authors, description, num_pages,
      image, google_book_id, title
    } = suggestion;

    return (
      <div className='book-details-container'>
        <div className='book-details-top'>
          <div className='book-details-image-container'>
            <img src={image} />
          </div>
          <div className='book-details'>
            <div className='book-title'>
              { title }
            </div>
            <div className='book-authors'>
              {authors}
            </div>
            <div className='book-description'>
              {description}
            </div>
            <div className='book-num_pages'>
              {num_pages}
            </div>
          </div>
        </div>
        <div className='book-details-actions'>
          <button className='book-details-actions-button'
            onClick={() => { onClick(google_book_id); }}
          >
            Start Reading
          </button>
        </div>
      </div>
    );
  }
}

export default BookDetailsModal;
