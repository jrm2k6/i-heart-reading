import React, { Component } from 'react';
import DashboardGroupsComponent from './DashboardGroupsComponent';

class GroupStats extends Component {
  render() {
    const className = `stats-container-item ${this.props.className} purple`;
    const groups = this.props.groups.filter(group => group.id > 0);
    const content = `${groups.length}`;

    const closeButton = (this.props.showingComponent) ?
      (<div className='stats-container-item-close' onClick={this.props.closeComponent}>
        <i className='material-icons'>close</i>
        </div>) : null;

    const expandButton = (!this.props.showingComponent) ?
      (<div className='stats-container-item-expand'>
        <i className='material-icons'>keyboard_arrow_down</i>
      </div>) : null;

    return (
      <div className={className}
        onClick={() => { if (!this.props.showingComponent) {
          this.props.showComponent(<DashboardGroupsComponent
            teachers={this.props.teachers}
            users={this.props.users}
            groups={groups}
          />);
        }}}
      >
        <div className='stats-container-item-horizontal-content'>
          <div className='stats-container-item-horizontal-content-left'>
            <div className='stats-container-item-left'>
              <i className='material-icons'>group</i>
              <div>
                <span className='number'>{content}</span>
                <span className='description'>groups</span>
              </div>
            </div>
          </div>
          {closeButton}
        </div>
        {expandButton}
      </div>
    );
  }
}

export default GroupStats;
