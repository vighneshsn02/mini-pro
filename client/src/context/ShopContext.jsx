import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kalakriti_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kalakriti_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [artisanTip, setArtisanTip] = useState(100);
  const [handwrittenNote, setHandwrittenNote] = useState('With heartfelt gratitude for supporting authentic Indian craftspersons.');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Modal states
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [activeArtisanModal, setActiveArtisanModal] = useState(null);
  const [activeDirectConnection, setActiveDirectConnection] = useState(null);
  const [activeWorkshopModal, setActiveWorkshopModal] = useState(null);
  const [activeStoryModal, setActiveStoryModal] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [selectedCraftFilter, setSelectedCraftFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kalakriti_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title.slice(0, 32)}..." to your craft basket!`);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from basket', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from your wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved to your handcrafted wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Fair trade calculation: ~79% of cart value goes directly to artisan guilds
  const artisanShareAmount = Math.round(cartSubtotal * 0.79);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        artisanShareAmount,
        artisanTip,
        setArtisanTip,
        handwrittenNote,
        setHandwrittenNote,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        toast,
        showToast,
        activeProductModal,
        setActiveProductModal,
        activeArtisanModal,
        setActiveArtisanModal,
        activeDirectConnection,
        setActiveDirectConnection,
        activeWorkshopModal,
        setActiveWorkshopModal,
        activeStoryModal,
        setActiveStoryModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
        selectedRegionFilter,
        setSelectedRegionFilter,
        selectedCraftFilter,
        setSelectedCraftFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
