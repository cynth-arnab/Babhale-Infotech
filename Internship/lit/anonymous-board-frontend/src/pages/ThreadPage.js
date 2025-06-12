import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles.css';


const ThreadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedThreads = JSON.parse(localStorage.getItem('threads') || '[]');
  const thread = savedThreads.find(t => t.id === id);

  const [replies, setReplies] = useState(thread?.replies || []);
  const [text, setText] = useState('');

  const addReply = () => {
    if (!text.trim()) return;
    const updatedReplies = [...replies, { text, time: new Date().toISOString() }];
    setReplies(updatedReplies);
    const updatedThreads = savedThreads.map(t =>
      t.id === id ? { ...t, replies: updatedReplies } : t
    );
    localStorage.setItem('threads', JSON.stringify(updatedThreads));
    setText('');
  };
  
  const addNestedReply = (replies, parentId, newReply) => {
    return replies.map(reply => {
      if (reply.id === parentId) {
        return { ...reply, replies: [...reply.replies, newReply] };
      } else {
        return {
          ...reply,
          replies: addNestedReply(reply.replies, parentId, newReply)
        };
      }
    });
  };

  

  if (!thread) {
    return (
      <div>
        <p>Thread not found.</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>{thread.title}</h2>
      <p>{thread.body}</p>

      <hr />
      <h3>Replies</h3>
      {replies.map((r, i) => (
        <div key={i}>
          <p>{r.text}</p>
          <small>{new Date(r.time).toLocaleString()}</small>
          <hr />
        </div>
      ))}

      <textarea
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
      ></textarea>
      <button onClick={addReply}>Reply</button>
    </div>
  );
};

export default ThreadPage;
