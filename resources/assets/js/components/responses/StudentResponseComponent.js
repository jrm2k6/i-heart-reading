import React, { Component } from 'react';
import { connect } from 'react-redux';
import { markdown } from 'markdown';
import FlatButton from 'material-ui/lib/flat-button';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import TextField from 'material-ui/lib/text-field';
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

  getCommentBox() {
    return (
      <div>
        <TextField
          hintText='Enter your comment'
          floatingLabelText='Comment'
          multiLine
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
        <div>
          {responseComponent}
          {commentBox}
          <div className='review-actions'>
            <RadioButtonGroup
              name='review_decision'
              onChange={(val) => { this.updateDecision(val); }}
            >
              <RadioButton
                value='accepted'
                label='Approve'
              />
              <RadioButton
                value='rejected'
                label='Reject'
              />
            </RadioButtonGroup>
            <FlatButton
              label='Add Comment'
              className='add-comment-response-button'
              onClick={() => { this.setState({ showingCommentBox: true });}}
            />
            <FlatButton
              label='Save'
              className='add-comment-response-button'
              onClick={() => {this.saveReview()}}
            />
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
