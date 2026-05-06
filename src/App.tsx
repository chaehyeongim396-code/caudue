/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Archive from './pages/Archive';
import Design from './pages/Design';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStartDesign={() => setCurrentPage('design')} />;
      case 'about':
        return <About />;
      case 'archive':
        return <Archive />;
      case 'design':
        return <Design />;
      case 'gallery':
        return <Gallery />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onStartDesign={() => setCurrentPage('design')} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

