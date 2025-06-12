import React, { useState } from 'react';
import '../styles.css';

const ThreadForm = ({ onPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('prompt');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newThread = {
      id: Date.now(),
      title,
      content,
      category,
      op: 'Anonymous',
      createdAt: new Date(),
      replies: [], // Initialized for threaded reply support
    };

    onPost(newThread);

    // Clear form fields
    setTitle('');
    setContent('');
    setCategory('prompt');
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <h3>Create a New Thread</h3>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter thread title"
        required
      />

      <label>Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        rows="5"
        required
      />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="prompt">✍️ Writing Prompts</option>
        <option value="script">📝 Script Fills</option>
        <option value="literature">📚 Literature</option>
      </select>

      <button type="submit">Post</button>
    </form>
  );
};

export default ThreadForm;
