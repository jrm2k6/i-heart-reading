import React from 'react'

export default class HelloMessage extends React.Component {
    render() {
        return (
            <div className='root-component'>
                <div className='lateral-menu'>
                    <div className='lateral-menu-item'>Add a book</div>
                </div>
                <div className='interactive-panel'>
                    Hello
                </div>
            </div>
        );
    }
}