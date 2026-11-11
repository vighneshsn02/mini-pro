import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Truck, 
  Package, 
  Feather,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    clearCart, 
    cartSubtotal, 
    artisanTip, 
    artisanShareAmount,
    handwrittenNote,
    showToast,
    setIsTrackingOpen
  } = useShop();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Priyanka Sharma',
    email: 'priyanka.s@example.com',
    phone: '+91 98765 43210',
    address: '402, Lotus Greens, 100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isPlacing, setIsPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const finalTotal = cartSubtotal + artisanTip;

  const handlePlaceOrder = async () => {
    try {
      setIsPlacing(true);
      const orderPayload = {
        customer: formData,
        items: cart.map(({ product, quantity }) => ({
          productId: product.id,
          title: product.title,
          artisanName: product.artisanName,
          price: product.price,
          quantity,
          image: product.images?.[0]
        })),
        subtotal: cartSubtotal,
        shipping: 0,
        artisanTip,
        total: finalTotal,
        paymentMethod,
        handwrittenNoteRequested: Boolean(handwrittenNote),
        noteMessage: handwrittenNote
      };

      const result = await api.createOrder(orderPayload);
      setPlacedOrder(result);
      clearCart();
      setStep(3);
      showToast(`Order ${result.id} placed successfully!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to place order', 'error');
    } finally {
      setIsPlacing(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#DCCBB5] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#1D3557] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#E9B44C]" />
            <h3 className="font-serif text-lg font-bold">
              {step === 3 ? 'Artisan Order Confirmed' : 'Handcrafted Checkout'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setStep(1);
            }}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        {step < 3 && (
          <div className="bg-white px-6 py-3 border-b border-[#E8DEC8] flex items-center justify-between text-xs font-semibold">
            <span className={step >= 1 ? 'text-[#C85A32] flex items-center gap-1.5' : 'text-[#8E7E6E]'}>
              1. Delivery Details
            </span>
            <span className="text-[#DCCBB5]">→</span>
            <span className={step >= 2 ? 'text-[#C85A32] flex items-center gap-1.5' : 'text-[#8E7E6E]'}>
              2. Secure Payment
            </span>
            <span className="text-[#DCCBB5]">→</span>
            <span className="text-[#8E7E6E]">
              3. Artisan Dispatch
            </span>
          </div>
        )}

        {/* Step 1: Shipping Details */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-5">
            <h4 className="font-serif text-lg font-bold text-[#2C241E]">
              Where Should We Deliver Your Heirlooms?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#2C241E] mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C241E] mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C241E] mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C241E] mb-1">Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#2C241E] mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C241E] mb-1">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#2C241E] mb-1">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-white border border-[#DCCBB5] rounded-xl px-3 py-2 text-[#2C241E] focus:outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Handwritten note reminder */}
            {handwrittenNote && (
              <div className="p-3 bg-[#FAF3E8] rounded-xl border border-[#ECDCC9] text-xs text-[#7A4B29] flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>
                  <strong>Handwritten Note Requested:</strong> "{handwrittenNote.slice(0, 70)}..."
                </span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-5">
            <h4 className="font-serif text-lg font-bold text-[#2C241E]">
              Select Preferred Payment Method
            </h4>

            {/* Payment Options Radio Grid */}
            <div className="space-y-2.5">
              {[
                { id: 'UPI', label: 'UPI / Google Pay / PhonePe / Paytm', icon: QrCode, desc: 'Instant 0% transaction fee' },
                { id: 'Card', label: 'Credit or Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                { id: 'COD', label: 'Cash on Handcrafted Delivery', icon: Banknote, desc: 'Pay when artisan package arrives' }
              ].map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#C85A32] bg-white shadow-xs'
                      : 'border-[#E8DEC8] bg-[#FAF7F2] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentMethod === opt.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#C85A32] accent-[#C85A32]"
                    />
                    <opt.icon className="w-5 h-5 text-[#C85A32]" />
                    <div>
                      <div className="text-xs font-bold text-[#2C241E]">{opt.label}</div>
                      <div className="text-[11px] text-[#7A6B5B]">{opt.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Simulated UPI QR Code preview if UPI is selected */}
            {paymentMethod === 'UPI' && (
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] text-center space-y-2">
                <div className="w-32 h-32 bg-[#F4EFE6] mx-auto rounded-xl border border-[#DCCBB5] flex flex-col items-center justify-center p-2">
                  <QrCode className="w-20 h-20 text-[#1D3557]" />
                  <span className="text-[10px] font-bold text-[#7A4B29]">kalakriti@upi</span>
                </div>
                <p className="text-[11px] text-[#7A6B5B]">
                  Simulated local UPI checkout for: <strong className="text-[#2C241E]">₹{finalTotal.toLocaleString()}</strong>
                </p>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-[#FAF3E8] p-4 rounded-2xl border border-[#ECDCC9] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7A6B5B]">
                <span>Items Subtotal:</span>
                <span className="font-bold text-[#2C241E]">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              {artisanTip > 0 && (
                <div className="flex justify-between text-[#7A6B5B]">
                  <span>Artisan Tip:</span>
                  <span className="font-bold text-[#C85A32]">+₹{artisanTip}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7A6B5B]">
                <span>Shipping:</span>
                <span className="font-bold text-[#4A7C59]">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2C241E] pt-2 border-t border-[#ECDCC9]">
                <span>Total Payable:</span>
                <span className="font-serif text-base text-[#C85A32]">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-[#5A4D41] hover:text-[#2C241E] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-7 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E9B44C]" />
                <span>{isPlacing ? 'Placing Order with Artisan...' : `Confirm & Pay ₹${finalTotal.toLocaleString()}`}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation & Printable Invoice */}
        {step === 3 && placedOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#EBF5EE] text-[#4A7C59] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#2C241E]">
                Thank You for Supporting Local Artisans!
              </h4>
              <p className="text-xs text-[#7A6B5B]">
                Order Reference: <strong className="text-[#C85A32]">{placedOrder.id}</strong> • Notification sent to {placedOrder.customer?.email}
              </p>
            </div>

            {/* Printable Order Receipt Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-[#F0E6D6] pb-3">
                <div>
                  <h5 className="font-serif text-base font-bold text-[#2C241E]">KalaKriti Craft Bazaar</h5>
                  <span className="text-[10px] text-[#7A6B5B]">Authentic Indian Handicrafts Guild</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#7A6B5B] block">Order Date:</span>
                  <span className="font-bold text-[#2C241E]">{new Date().toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                {placedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#2C241E]">{item.title}</span>
                      <span className="text-[#7A6B5B] block text-[11px]">
                        Crafted by {item.artisanName} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-[#2C241E]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0E6D6] pt-3 space-y-1">
                <div className="flex justify-between text-[#7A6B5B]">
                  <span>Subtotal:</span>
                  <span>₹{placedOrder.subtotal?.toLocaleString()}</span>
                </div>
                {placedOrder.artisanTip > 0 && (
                  <div className="flex justify-between text-[#7A6B5B]">
                    <span>Artisan Tip:</span>
                    <span>₹{placedOrder.artisanTip}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#2C241E] pt-1">
                  <span>Total Paid:</span>
                  <span className="text-[#C85A32]">₹{placedOrder.total?.toLocaleString()}</span>
                </div>
              </div>

              {/* Artisan direct payout badge */}
              <div className="bg-[#FAF3E8] p-3 rounded-xl border border-[#ECDCC9] text-[11px] text-[#7A4B29] flex items-center justify-between">
                <span>Fair Livelihood Transferred to Guilds:</span>
                <strong className="text-[#C85A32]">
                  ₹{Math.round((placedOrder.total || 0) * 0.79).toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="bg-white hover:bg-[#FAF7F2] text-[#2C241E] border border-[#DCCBB5] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#C85A32]" />
                <span>Print Artisan Receipt</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsTrackingOpen(true);
                  }}
                  className="bg-[#1D3557] hover:bg-[#14243B] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-[#E9B44C]" />
                  <span>Track Live Package</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="bg-[#C85A32] hover:bg-[#B34722] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
