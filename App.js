import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import ListPropertyPage from './pages/ListPropertyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
        <Route path="/list-property" element={<ListPropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
