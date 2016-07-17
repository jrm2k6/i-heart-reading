import React from 'react';

const EmailNotConfirmedComponent = () => {
  return (
    <div className='email-not-confirmed-container'>
      <div className='email-not-confirmed-explanation'>
        <p>It looks like your email is not confirmed! Bummer.</p>
        <p>Make sure to check your inbox (including your Spam folder), to confirm your email address</p>
      </div>
    </div>
  );
};

export default EmailNotConfirmedComponent;
