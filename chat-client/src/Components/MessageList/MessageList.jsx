import React from 'react';

import MessageItem from '../MessageItem/MessageItem';

import './MessageList.css';

export default function MessageList({ messages, name }) {
    return (
        <ul className='messages'>
            {messages.map((message, i) => (
                <MessageItem key={i} message={message} name={name} />
            ))}
        </ul>
    );
}
