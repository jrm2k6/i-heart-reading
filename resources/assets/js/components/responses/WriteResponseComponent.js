import React, { Component } from 'react';
import { MarkdownEditor } from 'react-markdown-editor';

class WriteResponseComponent extends Component {
  render() {
    return (
        <div>
          <MarkdownEditor initialContent=''
            iconsSet='font-awesome'
          />
        </div>
    );
  }
}

export default WriteResponseComponent;
