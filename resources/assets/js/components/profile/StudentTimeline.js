import React from 'react';
import TimelineItem from './TimelineItem';

class StudentTimeline extends React.Component {
  render() {
    const { updates } = this.props;
    if (updates) {
      return (
        <div className='profile-container-timeline'>
          {updates.map(update => <TimelineItem update={update} />)}
        </div>
      );
    }

    return (
      <div className='profile-container-timeline'>
        Loading...
      </div>
    );
  }
}

export default StudentTimeline;
