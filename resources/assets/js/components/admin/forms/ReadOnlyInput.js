import React, { Component } from 'react';

class ReadOnlyInput extends Component {
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
