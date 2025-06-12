import React from 'react';

const ThreadPreview = ({ thread, onClose }) => {
  return (
    <div className="thread-preview">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>{thread.title}</h2>
      <p><em>Category: {thread.category}</em></p>
      <div className="preview-body">{thread.content}</div>
    </div>
  );
};

export default ThreadPreview;
