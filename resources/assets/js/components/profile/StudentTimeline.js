import React from 'react';
import TimelineItem from './TimelineItem';

class StudentTimeline extends React.Component {
  render() {
    const { updates } = this.props;

    if (updates) {
      const chronologicalUpdates = updates.sort((update1, update2) =>
         new Date(update2.updated_at) - new Date(update1.updated_at)
      );
      return (
        <div className='profile-container-timeline'>
          {chronologicalUpdates.map(update => <TimelineItem update={update} />)}
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
