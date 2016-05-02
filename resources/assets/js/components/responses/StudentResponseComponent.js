import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getResponse } from '../../actions/teacherReviewsActions';

const mapStateToProps = (state) => {
  return {
    currentResponse: state.teacherReviewsReducer.currentResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentResponse: (id) => {
      dispatch(getResponse(id));
    },
  };
};

class StudentResponseComponent extends Component {
  componentDidMount() {
    this.props.onGetCurrentResponse(parseInt(this.props.params.responseId, 10));
  }

  getResponseComponent(currentResponse) {
    switch (currentResponse.response_type_id) {
      case 1:
        return (
          <div className='textual-response-content'>
            {currentResponse.content}
          </div>
        );
      case 2:
        return (
          <div className='image-response-content'>
            <img src={currentResponse.url} />
          </div>
        );
      case 3:
        return (
          <div className='video-response-content'>
            <a href={currentResponse.url}>Video</a>
          </div>
        );
      case 4:
        return (
          <div className='link-response-content'>
            <a href={currentResponse.url}>Url</a>
          </div>
        );
      default:
        return (
          <div>Not able to parse response</div>
        );
    }
  }

  render() {
    let responseComponent = null;
    const { currentResponse } = this.props;
    if (currentResponse) {
      responseComponent = this.getResponseComponent(currentResponse);
    }

    return (
        <div>
          {responseComponent}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentResponseComponent);
