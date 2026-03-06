import React from "react";
import { CartItem } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartSidebar({ isOpen, onClose, cart, cartTotal, onUpdateQuantity, onRemove }: CartSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#2A2420]/40 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#F5F0EB] z-50 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#D4C9BC]">
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-600">Your Cart</h2>
            <span className="font-['Jost'] text-xs text-[#8B7D72] font-300">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#6B5E54] hover:text-[#2A2420] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C4B8AA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-['Cormorant_Garamond'] text-xl font-600 mt-6 mb-2">Nothing here yet</p>
              <p className="font-['Jost'] text-sm text-[#8B7D72] font-300">
                Your cart is waiting for something beautiful.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-[#E8E0D6] overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Cormorant_Garamond'] text-base font-600 truncate">
                      {item.product.name}
                    </h4>
                    <span className="font-['Jost'] text-xs text-[#8B7D72] font-300">
                      {item.product.category}
                    </span>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D4C9BC]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center font-['Jost'] text-sm text-[#6B5E54] hover:text-[#2A2420] transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-['Jost'] text-sm font-500 border-x border-[#D4C9BC]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center font-['Jost'] text-sm text-[#6B5E54] hover:text-[#2A2420] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-['Jost'] text-sm font-500">
                          ${item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="text-[#C4B8AA] hover:text-[#8B6914] transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 md:p-8 border-t border-[#D4C9BC]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Jost'] text-sm text-[#6B5E54] font-300">Subtotal</span>
              <span className="font-['Cormorant_Garamond'] text-2xl font-700">${cartTotal}</span>
            </div>
            <p className="font-['Jost'] text-[11px] text-[#8B7D72] font-300 mb-5">
              {cartTotal >= 100 ? "Free shipping included ✦" : `Add $${100 - cartTotal} more for free shipping`}
            </p>
            <button className="w-full bg-[#2A2420] text-[#F5F0EB] font-['Jost'] text-sm font-500 tracking-[0.1em] uppercase py-4 hover:bg-[#8B6914] transition-colors duration-300">
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full font-['Jost'] text-sm text-[#8B7D72] font-300 mt-3 py-2 hover:text-[#2A2420] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}