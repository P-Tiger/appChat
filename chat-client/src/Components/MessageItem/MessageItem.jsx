import React from 'react';

import './MessageItem.css';

export default function MessageItem({ message: { user, text }, name }) {
  const trimmedName = name.trim().toLowerCase();
  return (
    <li
      className={
        user === trimmedName
          ? 'message right appeared'
          : 'message left appeared'
      }
    >
      <div className='avatar' />
      <div className='text_wrapper'>
        <div className='user'> {user}</div>
        <div className='text'>{text}</div>
      </div>
    </li>
  );
}
