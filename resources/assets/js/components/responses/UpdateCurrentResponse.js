import React, { Component } from 'react';
import { connect } from 'react-redux';
import { markdown } from 'markdown';
import { fetchAssignedBooks } from '../../actions/crudActions';
import YoutubeEmbedPlayer from './YoutubeEmbedPlayer';

const mapStateToProps = (state) => {
  return {
    assignedBooks: state.bookReducers.assignedBooks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAssignedBooks: () => {
      dispatch(fetchAssignedBooks());
    }
  }
}

class UpdateResponseComponent extends Component {
  componentWillMount() {
    this.props.onFetchAssignedBooks();
  }

  getCurrentAssignment() {
    const { assignedBooks } = this.props;
    const assignmentId = this.props.params.assignmentId;

    return assignedBooks.find(assignedBook => assignedBook.id === parseInt(assignmentId, 10));
  }

  getCurrentReviewComponent(currentReview) {
    const iconStatus = (currentReview.decision_type_name === 'accepted') ?
        (<i className='material-icons accepted'>thumb_up</i>)
      : (<i className='material-icons rejected'>thumb_down</i>);

    const commentComponent = (currentReview.comment) ?
      ( <div className='update-response-current-review-comment'>
          {currentReview.comment}
        </div>
      ) : (
        <div className='update-response-current-review-comment no-comment'>
          No comment posted for this assignment
        </div>
      );

    return (
      <div className='update-response-current-review'>
        <div className='update-response-current-review-status'>
          {iconStatus}
        </div>
        {commentComponent}
      </div>
    );
  }

  getCurrentResponse(currentAssignment) {
    return currentAssignment.response;
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
        const videoIdRegex = /.*youtube.com.*v=([A-Za-z0-9_-]*).*/;
        const matches = videoIdRegex.exec(currentResponse.url);
        if (matches) {
          const _videoId = matches[1];
          return (
            <div className='video-response-content youtube'>
              <YoutubeEmbedPlayer videoId={_videoId} />
            </div>
          );
        }

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
    if (this.props.assignedBooks.length > 0) {
      let responseComponent = null;
      let currentReviewComponent = null;

      const currentAssignment = this.getCurrentAssignment();
      const currentResponse = this.getCurrentResponse(currentAssignment);
      const currentReview = currentAssignment.current_review;

      if (currentResponse) {
        responseComponent = this.getResponseComponent(currentResponse);
      }

      if (currentReview) {
        currentReviewComponent = this.getCurrentReviewComponent(currentReview);
      }

      const headerTitle = (currentAssignment) ?
        (<div className='review-response-header-title'>
          {currentAssignment.book.title} - {currentAssignment.book.author}
        </div>)
        : null;

      return (
          <div className='review-response-container'>
            <div className='review-response-header-container'>
              {headerTitle}
            </div>
            {responseComponent}
            {currentReviewComponent}
          </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateResponseComponent);
