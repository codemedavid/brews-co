import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    let price = item.basePrice;
    if (selectedVariation) {
      price = item.basePrice + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`group relative bg-brew-off-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-brew-gray/10 hover:border-brew-accent/30 ${!item.available ? 'opacity-60' : ''}`}>
        {/* Status Badges */}
        {item.popular && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-brew-accent to-yellow-500 text-brew-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ Popular
          </div>
        )}
        
        {!item.available && (
          <div className="absolute top-4 left-4 z-20 bg-brew-gray text-brew-off-white text-xs font-medium px-3 py-1 rounded-full">
            Unavailable
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              style={{ opacity: 0 }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brew-paper to-brew-light ${item.image ? 'hidden' : ''}`}>
            <div className="text-8xl opacity-20">☕</div>
          </div>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brew-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-xl font-art-school font-bold text-brew-black mb-2 group-hover:text-brew-accent transition-colors duration-300">
              {item.name}
            </h4>
            <p className={`text-sm leading-relaxed ${!item.available ? 'text-brew-gray/60' : 'text-brew-gray'} line-clamp-2`}>
              {!item.available ? 'Currently Unavailable' : item.description}
            </p>
          </div>
          
          {/* Price and Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-2xl font-art-school font-bold text-brew-black">
                ₱{item.basePrice}
                {item.variations && item.variations.length > 0 && (
                  <span className="text-sm text-brew-gray/70 ml-1 font-normal">starting</span>
                )}
              </span>
              {item.variations && item.variations.length > 0 && (
                <div className="text-xs text-brew-gray/70 mt-1">
                  {item.variations.length} size{item.variations.length > 1 ? 's' : ''} available
                </div>
              )}
            </div>
            
            {!item.available ? (
              <button
                disabled
                className="bg-brew-gray/30 text-brew-gray px-6 py-3 rounded-xl cursor-not-allowed font-medium"
              >
                Unavailable
              </button>
            ) : quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-brew-black to-brew-dark text-brew-off-white px-6 py-3 rounded-xl hover:from-brew-dark hover:to-brew-black transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
              >
                {item.variations?.length || item.addOns?.length ? 'Add to Cart' : 'Add to Cart'}
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-brew-light rounded-xl p-1 shadow-inner">
                <button
                  onClick={handleDecrement}
                  className="p-2 hover:bg-brew-gray/20 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold text-brew-black min-w-[28px] text-center text-lg">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-2 hover:bg-brew-gray/20 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Add-ons indicator */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="text-xs text-brew-gray/70 flex items-center">
              <span className="w-1 h-1 bg-brew-accent rounded-full mr-2"></span>
              {item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-brew-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-brew-off-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto paper-texture-subtle shadow-2xl">
            <div className="sticky top-0 bg-brew-off-white border-b border-brew-gray/20 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-noto font-bold text-brew-black">Customize {item.name}</h3>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-brew-light rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-brew-black mb-4 text-lg">Choose Size</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className="flex items-center justify-between p-4 border-2 border-brew-gray/30 rounded-xl hover:bg-brew-light cursor-pointer transition-all duration-200 hover:border-brew-accent"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-brew-accent focus:ring-brew-accent"
                          />
                          <span className="font-medium text-brew-black">{variation.name}</span>
                        </div>
                        <span className="text-brew-black font-bold">
                          ₱{item.basePrice + variation.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-brew-black mb-4 text-lg">Add-ons</h4>
                  {Object.entries(groupedAddOns || {}).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-bold text-brew-gray mb-3 capitalize">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-brew-gray/30 rounded-xl hover:bg-brew-light transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-medium text-brew-black">{addOn.name}</span>
                              <div className="text-sm text-brew-gray">
                                {addOn.price > 0 ? `₱${addOn.price} each` : 'Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-brew-light rounded-xl p-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-2 hover:bg-brew-gray/20 rounded-lg transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="font-bold text-brew-black min-w-[20px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-2 hover:bg-brew-gray/20 rounded-lg transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-brew-black text-brew-off-white rounded-xl hover:bg-brew-dark transition-colors duration-200 text-sm font-medium"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t border-brew-gray/20 pt-4 mb-6">
                <div className="flex items-center justify-between text-2xl font-noto font-bold text-brew-black">
                  <span>Total:</span>
                  <span>₱{calculatePrice()}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-gradient-to-r from-brew-black to-brew-dark text-brew-off-white py-4 rounded-xl hover:from-brew-dark hover:to-brew-black transition-all duration-300 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - ₱{calculatePrice()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;