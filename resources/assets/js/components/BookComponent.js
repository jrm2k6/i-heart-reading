import React from 'react'
import LateralMenu from './LateralMenu';

export default class BookComponent extends React.Component {
    render() {
        return (
            <div>
              {this.props.children}
            </div>
        );
    }
}
