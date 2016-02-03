import React from 'react';

import {FormsyDate, FormsyText} from 'formsy-material-ui';
import {Form} from 'formsy-react';
import RaisedButton from 'material-ui/lib/raised-button';

export default class BookComponent extends React.Component {
    render() {
      return (
        <Form>
          <FormsyText
            name='book-title'
            floatingLabelText='Title'
          />
          <FormsyText
            name='book-author-name'
            floatingLabelText='Author'
          />
          <div>
            <FormsyText
              name='book-nb-pages-read'
            />
            <span>of</span>
            <FormsyText
              name='book-nb-pages'
            />
          </div>
          <RaisedButton
            type="submit"
            label="Submit"
          />
        </Form>
      );
    }
}
