import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import '../styles.css';


const CategoryPage = () => {
  const { categoryName } = useParams();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('threads');
    setThreads(saved ? JSON.parse(saved) : []);
  }, []);

  return (
    <div>
      <h1>
        <Link to="/">← Back to Home</Link>
      </h1>
      <ThreadList threads={threads} selectedCategory={categoryName} />
    </div>
  );
};

export default CategoryPage;
