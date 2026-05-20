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
  const [selectedCategory, setSelectedCategory] = useState('eco-bag');

  // Simple scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigateToShop = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('gallery');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onStartDesign={() => setCurrentPage('design')} 
            onNavigateToShop={handleNavigateToShop} 
          />
        );
      case 'about':
        return <About />;
      case 'archive':
        return <Archive />;
      case 'design':
        return <Design />;
      case 'gallery':
        return (
          <Gallery 
            initialCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        );
      case 'profile':
        return <Profile onStartDesign={() => setCurrentPage('design')} />;
      default:
        return (
          <Home 
            onStartDesign={() => setCurrentPage('design')} 
            onNavigateToShop={handleNavigateToShop} 
          />
        );
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={(page) => {
        if (page === 'gallery') {
          // Default to 'all' or keep previous when visiting SHOP via navbar
          setSelectedCategory('all');
        }
        setCurrentPage(page);
      }}
    >
      {renderPage()}
    </Layout>
  );
}

