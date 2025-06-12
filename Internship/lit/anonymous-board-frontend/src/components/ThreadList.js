import React from 'react';
import '../styles.css';

const categoryLabels = {
  prompt: '✍️ Writing Prompt',
  script: '📝 Script Fill',
  literature: '📚 Literature'
};

const ThreadList = ({ threads, selectedCategory, onSelectThread }) => {
  const filtered = selectedCategory === 'all'
    ? threads
    : threads.filter(thread => thread.category === selectedCategory);

  return (
    <div>
      <h2>{selectedCategory === 'all' ? 'All Threads' : categoryLabels[selectedCategory]}</h2>
      {filtered.length === 0 && <p>No threads in this category.</p>}

      <ul>
        {filtered.map((thread) => (
          <li key={thread.id} onClick={() => onSelectThread(thread)} style={{ cursor: 'pointer' }}>
            <span className={`category-tag ${thread.category}`}>
              {categoryLabels[thread.category]}
            </span>{' '}
            <strong>{thread.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
