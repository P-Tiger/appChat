import React from 'react';

import './Input.css';

export default function Input({ message, setMessage, sendMessage }) {
    return (
    <div className='bottom_wrapper'>
      <div className='message_input_wrapper'>
        <input
          className='message_input'
          type='text'
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
      </div>
      <div className='send_message' onClick={event => sendMessage(event)}>
        <div className='icon'/>
        <div className='text'>Send</div>
      </div>
    </div>
  );
}
