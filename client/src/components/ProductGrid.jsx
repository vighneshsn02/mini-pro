import React, { useState, useEffect } from 'react';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';
import { api } from '../utils/api';
import { useShop } from '../context/ShopContext';
import { Sparkles, PackageOpen } from 'lucide-react';

export default function ProductGrid() {
  const { searchQuery, selectedRegionFilter, selectedCraftFilter, setSelectedCraftFilter, setSelectedRegionFilter } = useShop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCraft, setActiveCraft] = useState(selectedCraftFilter || 'All');
  const [activeState, setActiveState] = useState(selectedRegionFilter || 'All');
  const [giOnly, setGiOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Synchronize context changes
  useEffect(() => {
    if (selectedCraftFilter) {
      setActiveCraft(selectedCraftFilter);
    }
  }, [selectedCraftFilter]);

  useEffect(() => {
    if (selectedRegionFilter) {
      setActiveState(selectedRegionFilter);
    }
  }, [selectedRegionFilter]);

  // Fetch products from backend whenever filters or search query changes
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await api.getProducts({
          category: activeCategory,
          craftType: activeCraft,
          state: activeState !== 'All' ? activeState : undefined,
          isGiCertified: giOnly ? 'true' : undefined,
          search: searchQuery,
          sort: sortBy
        });
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load artisanal products. Please ensure the local server is running.');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [activeCategory, activeCraft, activeState, giOnly, sortBy, searchQuery]);

  return (
    <section id="products-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterpieces Direct from Artisans</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
            Authentic Regional Handicrafts
          </h2>
          <p className="text-sm text-[#7A6B5B] mt-1">
            Hand-molded, hand-loomed, and hand-painted by local artisan guilds across India.
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <ProductFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeCraft={activeCraft}
        setActiveCraft={(c) => {
          setActiveCraft(c);
          setSelectedCraftFilter(c);
        }}
        activeState={activeState}
        setActiveState={(s) => {
          setActiveState(s);
          setSelectedRegionFilter(s);
        }}
        giOnly={giOnly}
        setGiOnly={setGiOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={products.length}
      />

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-[#E8DEC8] p-4 flex flex-col justify-between">
              <div className="bg-[#EFE7D8] h-48 rounded-xl" />
              <div className="space-y-2">
                <div className="bg-[#EFE7D8] h-4 w-3/4 rounded-sm" />
                <div className="bg-[#EFE7D8] h-3 w-1/2 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-200 text-red-800">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E8DEC8] max-w-lg mx-auto">
          <PackageOpen className="w-12 h-12 text-[#A89886] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#2C241E]">No Handicrafts Found</h3>
          <p className="text-xs text-[#7A6B5B] mt-1.5 mb-6">
            We couldn't find any products matching your current filters. Try resetting your search or choosing a different craft tradition.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveCraft('All');
              setActiveState('All');
              setSelectedRegionFilter('All');
              setSelectedCraftFilter('All');
              setGiOnly(false);
            }}
            className="bg-[#C85A32] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#B34722] transition-colors cursor-pointer"
          >
            Show All Handcrafted Pieces
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </section>
  );
}
