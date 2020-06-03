import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TopMenu from '../TopMenu/TopMenu';
import Input from '../Input/Input';
import Message from '../MessageList/MessageList';
import TextContainer from '../TextContainer/TextContainer';
import $ from 'jquery';
import './chat.css';
import '../../Responsive/grid.css';


let socket;

export default function Chat({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const PORT = 'https://chat-react-peter.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(PORT);
        setName(name);
        setRoom(room);

        // send event to server
        socket.emit('join', { name, room }, error => {
            if (error) {
                alert(error);
            }
        });
        // clear up
        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [PORT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
            let objMessage = $('.messages');
            if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); // Scroll when have new message 
            } else {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
            }
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            // send event to server
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    return (
        <div className='appChat'>
            <div className='grid wide'>
                <div className='row'>
                    <div className='col l-4 m-5 c-4'>
                        <TextContainer users={users} />
                    </div>
                    <div className='col l-8 m-7 c-8'>
                        <div className='chat_window'>
                            <TopMenu room={room} />
                            <Message messages={messages} name={name} />
                        </div>
                        <Input
                            message={message}
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
