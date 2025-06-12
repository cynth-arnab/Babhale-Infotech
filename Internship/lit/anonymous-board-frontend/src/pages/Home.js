import React, { useState, useEffect } from 'react';
import ThreadForm from '../components/ThreadForm';
import ThreadList from '../components/ThreadList';
import '../styles.css';

const Home = () => {
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('threads');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    localStorage.setItem('threads', JSON.stringify(threads));
  }, [threads]);

  const addThread = (thread) => {
    const newThread = {
      ...thread,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      replies: [],
      op: thread.op || 'Anonymous'
    };
    setThreads((prev) => [newThread, ...prev]);
  };

  return (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
      <div style={{ flex: 2 }}>
        <h1>The Dead Letters Collective</h1>

        <ThreadForm onPost={addThread} />

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="categoryFilter">Filter by category: </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="prompt">✍️ Writing Prompts</option>
            <option value="script">📝 Script Fills</option>
            <option value="literature">📚 Literature</option>
          </select>
        </div>

        <ThreadList
          threads={threads}
          selectedCategory={selectedCategory}
          onSelectThread={setSelectedThread}
        />
      </div>

      {/* Thread Preview Pane */}
      {selectedThread && (
        <div
          className="thread-preview"
          onClick={() => window.location.href = `/thread/${selectedThread.id}`}
          style={{
            flex: 1,
            border: '1px solid #e4d8ca',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            position: 'sticky',
            top: '20px',
            maxHeight: '120vh',
            overflowY: 'auto'
          }}
        >
          <h3>{selectedThread.title}</h3>
          <p><strong>OP:</strong> {selectedThread.op}</p>
          <p><strong>Posted:</strong> {new Date(selectedThread.createdAt).toLocaleString()}</p>
          <p>{selectedThread.content?.slice(0, 500)}{selectedThread.content?.length > 500 && '...'}</p>
          <p><strong>{selectedThread.replies?.length || 0}</strong> replies</p>
          <p><em>Click to expand thread</em></p>
        </div>
      )}
    </div>
  );
};

export default Home;
