import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/GroupChat.css';

function Chat() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({ fullname: 'Guest' });
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Check if there is a logged in user. If not, redirect to the welcome page.
  useEffect(() => {
    const loggedInUserId = JSON.parse(localStorage.getItem('loggedIn'));
    if (!loggedInUserId) {
      navigate('/Welcome');
    } else {
      setLoggedInUserId(loggedInUserId);
    }
  }, [navigate]);

  // Get the user information from local storage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUserId = JSON.parse(localStorage.getItem('loggedIn'));
    const user = users.find(user => user.id === +loggedInUserId);
    setLoggedInUser(user || { fullname: 'Guest' });
  }, []);

  // Render the messages from local storage
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(messages);
  }, []);

  // Update the messages in local storage and state when a new message is sent
  const handleMessageSend = () => {
    if (!inputValue.trim()) {
      alert('Please enter a message before sending');
      return;
    }
    const date = new Date();
    const time = `[${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
    const message = {
      time,
      username: loggedInUser.fullname,
      message: inputValue,
      messageId: Date.now(),
      userId: loggedInUserId, // Add the userId field
    };
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setInputValue('');
  };

  // Refresh the chat messages from local storage
  const handleRefreshClick = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    window.location.reload();
    setMessages(messages);
  };

  return (
    <>
      <div className="messages-div">
        <h1 className="header">
          Group Chat<span className="ex">✕</span>
        </h1>
        <div className="messages-chat" id="chat-area">
          {messages.map(({ time, username, message }, index) => (
            <div key={index}>{`${time} ${username}: ${message}`}</div>
          ))}
        </div>
      </div>
      <div className="chat-div">
        <div className="name-chat">{loggedInUser.fullname}</div>
        <input
          type="text"
          className="message-chat"
          placeholder="Input messages here"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className="button-send">
          <button className="send-button" onClick={handleMessageSend}>
            Send
          </button>
        </div>
        <div className="button-refresh">
          <button className="refresh-button" onClick={handleRefreshClick}>
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
