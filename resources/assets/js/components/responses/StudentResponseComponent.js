import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { markdown } from 'markdown';
import { getAssignment, getResponse,
  createReview
} from '../../actions/teacherReviewsActions';

const mapStateToProps = (state) => {
  return {
    currentAssignment: state.teacherReviewsReducer.currentAssignment,
    currentResponse: state.teacherReviewsReducer.currentResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentResponse: (id) => {
      dispatch(getResponse(id));
    },
    onGetCurrentAssignment: (id) => {
      dispatch(getAssignment(id));
    },
    onCreateReview: (id, props) => {
      dispatch(createReview(id, props));
    }
  };
};

class StudentResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingCommentBox: false,
      commentContent: null,
      decision: null
    };
  }

  componentDidMount() {
    this.props.onGetCurrentResponse(parseInt(this.props.params.responseId, 10));
    this.props.onGetCurrentAssignment(parseInt(this.props.params.responseId, 10));
  }

  getClassnameButton(type) {
    if (this.state.decision === type) {
      return `review-action-button ${type}`;
    }

    return 'review-action-button';
  }

  getValueButton(typeWhenSelected, type) {
    if (this.state.decision === typeWhenSelected) {
      return `${type}!`;
    }
    return `${type}`;
  }

  getCommentBox() {
    return (
      <div className='review-response-comment-container'>
        <textarea
          placeholder='Enter your comment'
          rows={10}
          onChange={(e) => {this.setState({ commentContent: e.target.value });}}
        />
      </div>
    );
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

    const commentBox = (this.state.showingCommentBox) ?
      this.getCommentBox() :
      null;

    return (
        <div className='review-response-container'>
          <div className='review-response-header-container'>
            <div className='review-response-header-title'>
              Response for
            </div>
          </div>
          {responseComponent}
          {commentBox}
          <div className='review-actions'>
            <div className='review-actions-row'>
              <button
                className={this.getClassnameButton('approved')}
                onClick={() => { this.setState({ decision: 'approved' });}}
              >
                <i className='material-icons'>thumb_up</i>
                {this.getValueButton('approved', 'Good Job')}
              </button>
              <button
                className={this.getClassnameButton('rejected')}
                onClick={() => { this.setState({ decision: 'rejected' });}}
              >
                <i className='material-icons'>thumb_down</i>
                {this.getValueButton('rejected', 'Needs Improvement')}
              </button>
            </div>
            <div className='review-actions-row'>
              <button
                className='review-action-button add-comment'
                onClick={() => { this.setState({ showingCommentBox: true });}}
              >
                Add Comment
              </button>
              <button
                className='review-action-button submit-review'
                onClick={() => {this.saveReview()}}
                disabled={!this.state.decision}
              >
                Submit Review
              </button>
              <button
                className='review-action-button skip-review'
                onClick={() => { browserHistory.push('/app/responses'); }}
              >
                Skip Review
              </button>
            </div>
          </div>
        </div>
    );
  }

  saveReview() {
    const responseId = parseInt(this.props.params.responseId, 10);
    const commentContent = (this.state.commentContent) ? this.state.commentContent.trim() : null;
    const decisionStr = this.state.decision;
    const props = {
      response_id: responseId,
      comment: commentContent,
      decision: decisionStr,
      assignment_id: this.props.currentAssignment.id
    };

    this.props.onCreateReview(responseId, props);
  }

  updateDecision(e) {
    this.setState({ decision: e.target.value });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentResponseComponent);
