import React, { useState } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState<'dine-in' | 'pickup' | 'delivery'>('dine-in');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup' ? 'Ready for pickup' : '';
    
    const orderDetails = `
🛒 BREW&CO. ORDER

👤 Customer: ${customerName}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}` : ''}
${serviceType === 'pickup' ? `⏰ ${timeInfo}` : ''}
${contactNumber ? `📞 Contact: ${contactNumber}` : ''}

📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing Brew&Co.! ☕
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/61580448542963?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
  };

  const isFormValid = customerName && (serviceType !== 'delivery' || address);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-brew-gray hover:text-brew-black transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-3xl font-art-school font-bold text-brew-black ml-8">Quick Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-brew-off-white rounded-2xl shadow-lg p-6 border border-brew-gray/10">
          <h2 className="text-2xl font-art-school font-bold text-brew-black mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-brew-gray/20">
                <div>
                  <h4 className="font-bold text-brew-black">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-brew-gray">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-brew-gray">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-brew-gray">₱{item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-bold text-brew-black">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-brew-gray/20 pt-4">
            <div className="flex items-center justify-between text-2xl font-art-school font-bold text-brew-black">
              <span>Total:</span>
              <span>₱{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Quick Order Form */}
        <div className="bg-brew-off-white rounded-2xl shadow-lg p-6 border border-brew-gray/10">
          <h2 className="text-2xl font-art-school font-bold text-brew-black mb-6">Order Details</h2>
          
          <form className="space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-bold text-brew-black mb-2">Full Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-brew-gray/30 rounded-xl focus:ring-2 focus:ring-brew-accent focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-bold text-brew-black mb-3">Service Type *</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'dine-in', label: 'Dine In', icon: '🪑' },
                  { value: 'pickup', label: 'Pickup', icon: '🚶' },
                  { value: 'delivery', label: 'Delivery', icon: '🛵' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setServiceType(option.value as 'dine-in' | 'pickup' | 'delivery')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      serviceType === option.value
                        ? 'border-brew-black bg-brew-black text-brew-off-white shadow-lg'
                        : 'border-brew-gray/30 bg-brew-off-white text-brew-gray hover:border-brew-accent'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Number - Only for pickup and delivery */}
            {(serviceType === 'pickup' || serviceType === 'delivery') && (
              <div>
                <label className="block text-sm font-bold text-brew-black mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-brew-gray/30 rounded-xl focus:ring-2 focus:ring-brew-accent focus:border-transparent transition-all duration-200"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>
            )}

            {/* Delivery Address - Only for delivery */}
            {serviceType === 'delivery' && (
              <div>
                <label className="block text-sm font-bold text-brew-black mb-2">Delivery Address *</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-brew-gray/30 rounded-xl focus:ring-2 focus:ring-brew-accent focus:border-transparent transition-all duration-200"
                  placeholder="Enter your complete delivery address"
                  rows={3}
                  required
                />
              </div>
            )}

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-bold text-brew-black mb-2">Special Instructions</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-brew-gray/30 rounded-xl focus:ring-2 focus:ring-brew-accent focus:border-transparent transition-all duration-200"
                placeholder="Any special requests or notes..."
                rows={3}
              />
            </div>

            {/* Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center space-x-3 ${
                isFormValid
                  ? 'bg-gradient-to-r from-brew-black to-brew-dark text-brew-off-white hover:from-brew-dark hover:to-brew-black hover:scale-[1.02] shadow-lg hover:shadow-xl'
                  : 'bg-brew-gray/30 text-brew-gray cursor-not-allowed'
              }`}
            >
              <MessageCircle className="h-6 w-6" />
              <span>Order via Messenger</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;