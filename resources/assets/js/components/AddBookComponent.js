import React from 'react';
import { browserHistory } from 'react-router';
import SearchBookComponent from './SearchBookComponent';

export default class AddBookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddBook: false,
      bookTitle: null,
      bookAuthor: null,
      bookNumPages: null
    };
  }

  render() {
    return (
      <div>
        <SearchBookComponent />
      </div>
    );
  }
}
