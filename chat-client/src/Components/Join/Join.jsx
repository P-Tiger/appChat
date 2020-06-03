import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Join.css';

export default function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    async function getUser() {
        try {
            const nameUserInRoom = name.trim().toLowerCase();
            const roomOfUser = room.trim().toLowerCase();
            const res = await axios.get('https://chat-react-peter.herokuapp.com/users');

            for (const element of res.data) {
                if (element.name === nameUserInRoom && element.room === roomOfUser) {
                    alert("User is taken");
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();

    });

    function handleClick(event) {
        if (!name || !room) return event.preventDefault()
        return null;
    }

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div>
                    <input
                        placeholder='Name'
                        type='text'
                        onChange={event => setName(event.target.value)}
                        className='joinInput'
                    />
                </div>

                <div>
                    <input
                        placeholder='Room'
                        type='text'
                        onChange={event => setRoom(event.target.value)}
                        className='joinInput mt-20'
                    />
                </div>
                <Link
                    to={`/chat?name=${name}&room=${room}`} onClick={(event) => handleClick(event)}>
                    <button className='button mt-20'>Sign In</button>
                </Link>
            </div>
        </div>
    );
}
