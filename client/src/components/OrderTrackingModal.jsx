import React, { useState, useEffect } from 'react';
import { X, Package, Search, CheckCircle2, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../utils/api';

export default function OrderTrackingModal() {
  const { isTrackingOpen, setIsTrackingOpen, showToast } = useShop();

  const [orderIdInput, setOrderIdInput] = useState('ORD-84920');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isTrackingOpen) {
      loadOrder(orderIdInput);
    }
  }, [isTrackingOpen]);

  const loadOrder = async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await api.getOrderById(id.trim());
      setCurrentOrder(data);
    } catch (err) {
      console.error(err);
      // Fallback: fetch list and pick first if not found
      api.getOrders().then(list => {
        if (list.length > 0) setCurrentOrder(list[0]);
      }).catch(console.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadOrder(orderIdInput);
  };

  if (!isTrackingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-[#DCCBB5] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#1D3557] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-[#E9B44C]" />
            <div>
              <h3 className="font-serif text-lg font-bold">Live Handcrafted Delivery Tracker</h3>
              <p className="text-xs text-[#E8DEC8]">Eco-logistics direct from artisan clusters</p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-84920)"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full bg-white border border-[#DCCBB5] rounded-xl pl-3 pr-8 py-2 text-xs text-[#2C241E] font-medium focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C85A32] hover:bg-[#B34722] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {loading && (
            <div className="text-center py-8 text-xs text-[#7A6B5B]">
              Fetching live artisan logistics data...
            </div>
          )}

          {!loading && currentOrder && (
            <div className="space-y-6">
              
              {/* Order Status Pill */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7A6B5B] uppercase font-bold block">Tracking Order</span>
                  <h4 className="font-serif text-base font-bold text-[#2C241E]">{currentOrder.id}</h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF5EE] text-[#4A7C59] border border-[#D1E7D7]">
                  {currentOrder.status || 'In Transit'}
                </span>
              </div>

              {/* Progress Stepper */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8] space-y-4">
                <h5 className="font-serif text-xs font-bold text-[#2C241E] uppercase tracking-wider">
                  Handcrafted Journey Timeline
                </h5>

                <div className="space-y-4">
                  {currentOrder.trackingSteps?.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          step.completed
                            ? 'bg-[#4A7C59] text-white'
                            : 'bg-[#EAE0D0] text-[#7A6B5B]'
                        }`}>
                          {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        {idx < currentOrder.trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-8 my-0.5 ${step.completed ? 'bg-[#4A7C59]' : 'bg-[#E8DEC8]'}`} />
                        )}
                      </div>
                      <div className="pt-0.5 text-xs">
                        <span className={`font-bold block ${step.completed ? 'text-[#2C241E]' : 'text-[#7A6B5B]'}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] text-[#8E7E6E]">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address */}
              {currentOrder.customer && (
                <div className="bg-[#FAF3E8] p-3.5 rounded-xl border border-[#ECDCC9] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#2C241E]">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Destination: {currentOrder.customer.name}</span>
                  </div>
                  <p className="text-[11px] text-[#7A4B29]">
                    {currentOrder.customer.address}, {currentOrder.customer.city}, {currentOrder.customer.state} - {currentOrder.customer.pincode}
                  </p>
                </div>
              )}

              {/* Order Items */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] space-y-2 text-xs">
                <span className="font-bold text-[#2C241E] block">Items in Parcel:</span>
                {currentOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-[#F5ECE1] last:border-0 pb-1.5">
                    <span>{item.title} (×{item.quantity})</span>
                    <strong className="text-[#C85A32]">₹{(item.price * item.quantity).toLocaleString()}</strong>
                  </div>
                ))}
              </div>

            </div>
          )}

          {!loading && !currentOrder && (
            <div className="text-center py-6 text-xs text-red-600">
              No order found with ID "{orderIdInput}". Please verify the order number.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
