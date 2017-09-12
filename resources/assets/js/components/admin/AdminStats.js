import React, { Component } from 'react';
import DashboardAdminComponent from './DashboardAdminComponent';

class AdminStats extends Component {
  render() {
    const className = `stats-container-item ${this.props.className} yellow`;
    const content = `${this.props.admins.length}`;

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
          this.props.showComponent(DashboardAdminComponent);
        }}}
      >
        <div className='stats-container-item-horizontal-content'>
          <div className='stats-container-item-horizontal-content-left'>
            <div className='stats-container-item-left'>
              <i className='material-icons'>lock</i>
              <div>
                <span className='number'>{content}</span>
                <span className='description'>admins</span>
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

export default AdminStats;
