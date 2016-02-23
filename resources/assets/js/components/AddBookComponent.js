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
        canSubmit: false
      };
    }

    submit(_data) {
      this.props.onAddBook(_data);
    }

    render() {
      return (
        <div>
          <SearchBookComponent />
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
                name='book_nb_pages_read'
                value='0'
                validations='isInt'
              />
              <span>of</span>
              <FormsyText
                name='book_nb_pages'
                required
                validations='isInt'
              />
            </div>
            <RaisedButton
              type='submit'
              label='Submit'
              disabled={!this.state.canSubmit}
            />
          </Form>
        </div>
      );
    }
}
