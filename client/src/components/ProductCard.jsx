import React from 'react';
import { Heart, ShoppingBag, Star, ShieldCheck, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setActiveProductModal,
    setActiveArtisanModal
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8DEC8] hover:border-[#D0C0A5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F4EFE6] cursor-pointer" onClick={() => setActiveProductModal(product)}>
        <img
          src={product.images && product.images[0] ? product.images[0] : "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {product.isGiCertified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1D3557]/95 text-white shadow-xs backdrop-blur-xs">
              <ShieldCheck className="w-3 h-3 text-[#E9B44C]" />
              GI Tagged
            </span>
          )}
          {product.isBestseller && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C85A32] text-white shadow-xs">
              <Sparkles className="w-3 h-3" />
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
            isFavorited
              ? 'bg-red-50 text-[#C85A32]'
              : 'bg-white/80 hover:bg-white text-[#5A4D41] hover:text-[#C85A32]'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C85A32]' : ''}`} />
        </button>

        {/* Quick View Pill on Hover */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-white/95 text-[#2C241E] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#C85A32]" />
            View Craft Specs
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Region & Craft Tag */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7A6B5B]">
            <span>{product.craftType}</span>
            <span className="text-[#C85A32]">{product.state}</span>
          </div>

          {/* Title */}
          <h4 
            onClick={() => setActiveProductModal(product)}
            className="font-serif text-base font-bold text-[#2C241E] hover:text-[#C85A32] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.title}
          </h4>

          {/* Artisan Attribution Pill */}
          <div className="pt-0.5">
            <span className="text-xs text-[#6B5E52]">
              Crafted by{' '}
              <strong className="text-[#2C241E] hover:text-[#C85A32] transition-colors cursor-pointer underline underline-offset-2">
                {product.artisanName}
              </strong>
            </span>
          </div>
        </div>

        {/* Price & Fair Trade Maker Share */}
        <div className="pt-2 border-t border-[#F2EAE0] space-y-2">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-bold text-[#2C241E]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#9B8C7E] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-[#4A7C59] bg-[#EBF5EE] px-1.5 py-0.5 rounded-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Fair-Trade Maker Share Transparency (like iTokri) */}
          {product.artisanDirectPayout && (
            <div className="text-[11px] font-medium text-[#7A4B29] bg-[#FAF3E8] px-2 py-1 rounded-md border border-[#ECDCC9] flex items-center justify-between">
              <span>Fair Artisan Share:</span>
              <strong className="text-[#C85A32]">{product.artisanDirectPayout}</strong>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center justify-between text-xs text-[#7A6B5B] pt-0.5">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#E9B44C] fill-[#E9B44C]" />
              <span className="font-bold text-[#2C241E]">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
            <span className="text-[11px] text-[#4A7C59] font-medium">In Stock</span>
          </div>

        </div>

        {/* Add to Basket Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product, 1);
          }}
          className="w-full mt-2 bg-[#2C241E] hover:bg-[#C85A32] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#E9B44C] group-hover/btn:text-white transition-colors" />
          <span>Add to Craft Basket</span>
        </button>

      </div>

    </div>
  );
}
