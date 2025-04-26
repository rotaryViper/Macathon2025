import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import logo from './logo.png';

const ChatRoom = () => {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState('');
	const [message, setMessage] = useState('');

	const fetchMessages = async () => {
		try {
			const response = await fetch('http://localhost:5000/messages');
			const data = await response.json();
			setMessages(data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const sendMessage = async () => {
		try {
			await fetch('http://localhost:5000/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user, message }),
			});

			// Clear the message input after sending
			setMessage('');
			// Fetch messages to update the list
			fetchMessages();
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		// Fetch messages on component mount
		fetchMessages();
		// Poll for new messages every 2 seconds
		const interval = setInterval(() => {
			fetchMessages();
		}, 2000);

		return () => clearInterval(interval);
	}, []); // Run only once on mount

  const musicURL  = 'https://www.youtube.com/watch?v=jfKfPfyJRdk';
	return ( 
		<div>
      <div style={{width:"256px", margin: "0 auto"}}>
			  <h2 style = {{margin: "1vh 0 0 0"}}>Lock In</h2>
        <img src={logo} alt="Logo" width="64px" height="64px"></img>
        <h4 style={{margin: 0}}>
        Aim for goals beyond your comprehension. If you can do it now, you can do better later on.
        </h4>
      </div>
      <AudioPlayer url={musicURL} />
			<ul>
				{messages.map((message) => (
					<li key={message._id}>
						<strong>{message.user}:</strong> {message.message}
					</li>
				))}
			</ul>
			<div>
				<input
					type="text"
					placeholder="Your name"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Type your message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default ChatRoom;
