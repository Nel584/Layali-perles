import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { SplashLoader } from './components/SplashLoader';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ProductQuickView } from './components/ProductQuickView';
import { MobileBottomBar } from './components/MobileBottomBar';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { StoryPage } from './pages/StoryPage';
import { GuidePage } from './pages/GuidePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { CategoryType } from './types';

function MainApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['accueil', 'collection', 'histoire', 'guide', 'avis', 'contact'].includes(hash)) {
        return hash as PageId;
      }
    }
    return 'accueil';
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // Handle hash changes for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['accueil', 'collection', 'histoire', 'guide', 'avis', 'contact'].includes(hash)) {
        setActivePage(hash as PageId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string, category?: CategoryType) => {
    const targetPage = page as PageId;
    setActivePage(targetPage);
    if (category) {
      setSelectedCategory(category);
    }
    window.location.hash = `#/${targetPage}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#141210] text-[#221E1A] dark:text-[#F7F3ED] font-sans selection:bg-amber-500 selection:text-stone-950 transition-colors duration-300 flex flex-col justify-between">
      
      {/* 3-Second Splash / Reload Screen on Site Entrance */}
      {showSplash && (
        <SplashLoader
          durationSeconds={3}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Main Multi-Page App Shell */}
      <div className={`flex flex-col min-h-screen transition-opacity duration-500 ${showSplash ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        
        {/* Top Bar Navigation */}
        <Navbar
          activePage={activePage}
          onNavigate={(page) => handleNavigate(page)}
        />

        {/* Dynamic Page Views with Smooth Page Transition */}
        <main className="flex-1 pb-16 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {activePage === 'accueil' && (
                <HomePage onNavigate={handleNavigate} />
              )}

              {activePage === 'collection' && (
                <CollectionPage initialCategory={selectedCategory} />
              )}

              {activePage === 'histoire' && (
                <StoryPage onNavigate={handleNavigate} />
              )}

              {activePage === 'guide' && (
                <GuidePage onNavigate={handleNavigate} />
              )}

              {activePage === 'avis' && (
                <ReviewsPage onNavigate={handleNavigate} />
              )}

              {activePage === 'contact' && (
                <ContactPage />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer */}
        <Footer onNavigate={(page) => handleNavigate(page)} />

        {/* Mobile Thumb Navigation Bar */}
        <MobileBottomBar
          activePage={activePage}
          onPageSelect={(page) => handleNavigate(page)}
        />

        {/* Floating Modals & Drawers */}
        <CartDrawer />
        <CheckoutModal />
        <SizeGuideModal />
        <ProductQuickView />
      </div>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </ThemeProvider>
  );
}
