import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { markdown } from 'markdown';
import { getAcceptedResponse, getAcceptedAssignment } from '../../actions/teacherReviewsActions';

const mapStateToProps = (state) => {
  return {
    currentAssignment: state.teacherReviewsReducer.currentAssignment,
    currentResponse: state.teacherReviewsReducer.currentResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentResponse: (id) => {
      dispatch(getAcceptedResponse(id));
    },
    onGetCurrentAssignment: (id) => {
      dispatch(getAcceptedAssignment(id));
    }
  };
};

class AcceptedStudentResponseComponent extends Component {
  componentDidMount() {
    this.props.onGetCurrentResponse(parseInt(this.props.params.responseId, 10));
    this.props.onGetCurrentAssignment(parseInt(this.props.params.responseId, 10));
  }

  getCommentComponent(currentAssignment) {
    const comment = currentAssignment.current_review.comment;
    if (comment != null) {
      return (
        <div className='accepted-review-comment'>
          <div className='accepted-review-comment-header'>Comments</div>
          <div className='accepted-review-content-comment'>{comment}</div>
        </div>
      );
    }

    return null;
  }

  getResponseComponent(currentResponse) {
    switch (currentResponse.response_type_id) {
      case 1:
        const content = { __html: markdown.toHTML(currentResponse.content) };
        return (
          <div className='textual-response-content' dangerouslySetInnerHTML={content}>
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
            <a href={currentResponse.url} target='_blank'>Open Video</a>
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
    let commentComponent = null;
    const { currentResponse, currentAssignment } = this.props;
    if (currentResponse && currentAssignment) {
      responseComponent = this.getResponseComponent(currentResponse);
      commentComponent = this.getCommentComponent(currentAssignment);
    }

    const headerTitle = (currentAssignment) ?
      (<div className='review-response-header-title'>
        {currentAssignment.user.name} - {currentAssignment.book.title}
        <span className='header-title-approved-icon'>
          <i className='material-icons'>thumb_up</i>
        </span>
      </div>)
      : null;

    return (
        <div className='review-response-container'>
          <div className='review-response-header-container'>
            {headerTitle}
          </div>
          {responseComponent}
          {commentComponent}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedStudentResponseComponent);
