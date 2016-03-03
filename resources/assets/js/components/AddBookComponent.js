import React from 'react';

import { FormsyDate, FormsyText } from 'formsy-material-ui';
import { Form } from 'formsy-react';
import RaisedButton from 'material-ui/lib/raised-button';
import SearchBookComponent from './SearchBookComponent';

import { createBook } from '../actions/crudActions';

export default class AddBookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      showAddBook: false
    };
  }

  submit(_data) {
    this.props.onAddBook(_data);
  }

  render() {
    let addBookForm = (this.state.showAddBook) ?
      this.getAddBookForm() : null;

    return (
      <div>
        <SearchBookComponent />
        <span onClick={() => {this.setState({ showAddBook: true })}}>
          Cannot find your book? Click to add your new book
        </span>
        {addBookForm}
      </div>
    );
  }

  getAddBookForm() {
    return (
      <Form onValidSubmit={(data) => {this.submit(data);}}
          onValid={() => { this.setState({ canSubmit: true });}}
          onInvalid={() => { this.setState({ canSubmit: false });}}
      >
        <FormsyText
          name='book_title'
          required
          floatingLabelText='Title'
        />
        <FormsyText
          name='book_author_name'
          required
          floatingLabelText='Author'
        />
        <div>
          <FormsyText
            name='book_nb_pages'
            required
            validations='isInt'
            floatingLabelText='Number of Pages'
          />
        </div>
        <RaisedButton
          type='submit'
          label='Create and Assign'
          disabled={!this.state.canSubmit}
        />
      </Form>
    );
  }
}
