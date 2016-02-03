import React from 'react'
import LateralMenu from './LateralMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class AppComponent extends React.Component {
    render() {
        return (
            <div className='root-component'>
                <LateralMenu />
                <div className='interactive-panel'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
