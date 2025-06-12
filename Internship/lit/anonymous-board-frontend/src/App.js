import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThreadPage from './pages/ThreadPage';
import CategoryPage from './pages/CategoryPage';
import './styles.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thread/:id" element={<ThreadPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
