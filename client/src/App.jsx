import React from 'react';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CraftHeritageMap from './components/CraftHeritageMap';
import ProductGrid from './components/ProductGrid';
import ArtisansSection from './components/ArtisansSection';
import StoriesSection from './components/StoriesSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import ArtisanModal from './components/ArtisanModal';
import DirectConnectionModal from './components/DirectConnectionModal';
import WorkshopModal from './components/WorkshopModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import StoryModal from './components/StoryModal';
import ArtisanAdminPortal from './components/ArtisanAdminPortal';
import Toast from './components/Toast';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#E07A5F] selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Landing Page Experience */}
        <main className="flex-1">
          <HeroSection />
          <CraftHeritageMap />
          <ProductGrid />
          <ArtisansSection />
          <StoriesSection />
        </main>

        {/* Comprehensive Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <ArtisanModal />
        <DirectConnectionModal />
        <WorkshopModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderTrackingModal />
        <StoryModal />
        <ArtisanAdminPortal />

        {/* Toast Notifications */}
        <Toast />
      </div>
    </ShopProvider>
  );
}
