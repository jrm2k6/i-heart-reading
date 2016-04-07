import React, { Component } from 'react';
import { MarkdownEditor } from 'react-markdown-editor';
import FlatButton from 'material-ui/lib/flat-button';

class WriteResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseContent: null
    };
  }

  handleOnContentChange(content) {
    this.setState({ responseContent: content });
  }

  render() {
    return (
        <div className='write-response-container'>
          <div>
            Response for Book
          </div>
          <MarkdownEditor initialContent=''
            iconsSet='font-awesome'
            onContentChange={(content) => {this.handleOnContentChange(content);}}
          />
        <div className='response-actions'>
          <FlatButton
            label='Save' primary
            className='save-response-button'
          />
        </div>
        </div>
    );
  }
}

export default WriteResponseComponent;
