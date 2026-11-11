import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Gift, 
  Heart, 
  Sparkles, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  Feather
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    artisanShareAmount,
    artisanTip,
    setArtisanTip,
    handwrittenNote,
    setHandwrittenNote,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const tipOptions = [0, 50, 100, 250];
  const finalTotal = cartSubtotal + (cart.length > 0 ? artisanTip : 0);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Drawer Container */}
      <div 
        className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#DCCBB5]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DEC8] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
            <h3 className="font-serif text-lg font-bold text-[#2C241E]">
              Your Craft Basket ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EAE0D0] text-[#5A4D41] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping & Eco-Delivery Banner */}
        <div className="bg-[#1D3557] text-[#FAF7F2] py-2 px-4 text-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#E9B44C]" />
            Free Pan-India Carbon-Neutral Shipping
          </span>
          <span className="font-bold text-[#E9B44C]">₹0 (Free)</span>
        </div>

        {/* Body Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#A89886] mx-auto" />
              <h4 className="font-serif text-lg font-bold text-[#2C241E]">
                Your Craft Basket is Empty
              </h4>
              <p className="text-xs text-[#7A6B5B] max-w-xs mx-auto">
                Discover authentic treasures shaped by master potters, weavers, and metal smiths across India.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 bg-[#C85A32] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#B34722] transition-colors cursor-pointer"
              >
                Explore Heirlooms
              </button>
            </div>
          ) : (
            <>
              {/* Product items */}
              <div className="space-y-3">
                {cart.map(({ product, quantity }) => (
                  <div 
                    key={product.id}
                    className="bg-white p-3.5 rounded-2xl border border-[#E8DEC8] shadow-2xs flex gap-3 items-center"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#FAF7F2]"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32] block">
                        {product.craftType}
                      </span>
                      <h5 className="font-serif text-xs font-bold text-[#2C241E] line-clamp-1">
                        {product.title}
                      </h5>
                      <span className="text-[11px] text-[#7A6B5B] block">
                        By {product.artisanName}
                      </span>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="font-serif text-sm font-bold text-[#2C241E]">
                          ₹{(product.price * quantity).toLocaleString()}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#DCCBB5] rounded-lg bg-[#FAF7F2] px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#5A4D41] hover:text-[#C85A32] text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#2C241E]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#5A4D41] hover:text-[#C85A32] text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-[#A89886] hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Complimentary Handcrafted Gift (iTokri signature feature!) */}
              <div className="bg-[#FAF3E8] p-3.5 rounded-2xl border border-[#ECDCC9] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E9B44C]/30 text-[#7A4B29] flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-[#C85A32]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C241E] flex items-center gap-1">
                    <span>Complimentary Artisan Gift Included!</span>
                    <span className="text-[10px] bg-[#4A7C59] text-white px-1.5 py-0.2 rounded-sm font-black">FREE</span>
                  </div>
                  <p className="text-[11px] text-[#7A4B29] mt-0.5">
                    Every order includes a hand-pressed Ajrakh fabric bookmark & plantable seed paper card.
                  </p>
                </div>
              </div>

              {/* Tip the Artisan Guild (Direct Maker Support) */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DEC8] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2C241E] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#C85A32]" />
                    Tip the Artisan Guild
                  </span>
                  <span className="text-[11px] text-[#7A6B5B]">100% goes directly to makers</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {tipOptions.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setArtisanTip(amount)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        artisanTip === amount
                          ? 'bg-[#C85A32] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#5A4D41] hover:bg-[#EFE7D8] border border-[#E8DEC8]'
                      }`}
                    >
                      {amount === 0 ? 'No tip' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Handwritten Gift Note Request (like iTokri) */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DEC8] space-y-1.5">
                <label className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#C85A32]" />
                  Request a Handwritten Artisan Note
                </label>
                <textarea
                  rows={2}
                  value={handwrittenNote}
                  onChange={(e) => setHandwrittenNote(e.target.value)}
                  placeholder="Add a custom note to be penned by hand inside the packaging..."
                  className="w-full bg-[#FAF7F2] border border-[#DCCBB5] rounded-xl px-2.5 py-1.5 text-xs text-[#2C241E] focus:outline-hidden"
                />
              </div>

              {/* Fair Trade Impact Transparency Pill */}
              <div className="p-3 bg-[#EBF5EE] rounded-xl border border-[#D1E7D7] text-xs text-[#2D5A27] flex items-center justify-between">
                <span className="font-medium">Direct Artisan Livelihood Share:</span>
                <strong className="font-bold">₹{artisanShareAmount.toLocaleString()}</strong>
              </div>
            </>
          )}

        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8DEC8] bg-white space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#7A6B5B]">
                <span>Craft Items Subtotal:</span>
                <span className="font-bold text-[#2C241E]">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              {artisanTip > 0 && (
                <div className="flex justify-between text-[#7A6B5B]">
                  <span>Artisan Guild Tip:</span>
                  <span className="font-bold text-[#C85A32]">+₹{artisanTip}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7A6B5B]">
                <span>Eco-Packaging & Shipping:</span>
                <span className="font-bold text-[#4A7C59]">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2C241E] pt-2 border-t border-[#F0E6D6]">
                <span className="font-serif text-base">Total Amount:</span>
                <span className="font-serif text-lg text-[#C85A32]">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#C85A32] hover:bg-[#B34722] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Proceed to Handcrafted Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
