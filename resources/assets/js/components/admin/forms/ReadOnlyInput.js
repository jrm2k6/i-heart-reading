import React, { Component } from 'react';

class ReadOnlyInput extends Component {
  // <span className='read-only-copy-to-clipboard'
  //   onClick={() => document.execCommand('copy'); }
  // >
  //   <i className='material-icons'>content_copy</i>
  // </span>
  render() {
    return (
      <div className='read-only-input-wrapper'>
        <span className='read-only-label'>{this.props.title}</span>
        <span className='read-only-form-content'>{this.props.content}</span>
      </div>
    );
  }
}


export default ReadOnlyInput;
