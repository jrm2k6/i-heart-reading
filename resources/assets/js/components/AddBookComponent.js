import React from 'react';

import {FormsyDate, FormsyText} from 'formsy-material-ui';
import {Form} from 'formsy-react';
import RaisedButton from 'material-ui/lib/raised-button';

import {createBook} from '../actions/crudActions';

export default class BookComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          canSubmit: false
        };
    }

    submit(_data) {
      console.log(_data);
    }

    render() {
      return (
        <Form onValidSubmit={() => {this.submit()}}
            onValid={() => {this.setState({canSubmit: true})}}
            onInvalid={() => {this.setState({canSubmit: false})}}
        >
          <FormsyText
            name='book-title'
            required
            floatingLabelText='Title'
          />
          <FormsyText
            name='book-author-name'
            required
            floatingLabelText='Author'
          />
          <div>
            <FormsyText
              name='book-nb-pages-read'
              value='0'
              validations='isInt'
            />
            <span>of</span>
            <FormsyText
              name='book-nb-pages'
              required
              validations='isInt'
            />
          </div>
          <RaisedButton
            type="submit"
            label="Submit"
            disabled={!this.state.canSubmit}
          />
        </Form>
      );
    }
}
