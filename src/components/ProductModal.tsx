import React from "react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#2A2420]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#F5F0EB] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-[#6B5E54] hover:text-[#2A2420] transition-colors bg-[#F5F0EB]/80 backdrop-blur-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="aspect-[4/5] bg-[#E8E0D6]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="font-['Jost'] text-[10px] uppercase tracking-[0.2em] text-[#8B6914] font-500 mb-4">
              {product.category}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-600 leading-tight mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    width="14"
                    height="14"
                    viewBox="0 0 12 12"
                    fill={star <= Math.round(product.rating) ? "#8B6914" : "none"}
                    stroke="#8B6914"
                    strokeWidth="0.8"
                  >
                    <polygon points="6,1 7.5,4.2 11,4.6 8.5,7 9.2,10.5 6,8.8 2.8,10.5 3.5,7 1,4.6 4.5,4.2" />
                  </svg>
                ))}
              </div>
              <span className="font-['Jost'] text-sm text-[#8B7D72] font-300">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <div className="w-12 h-px bg-[#D4C9BC] mb-6" />

            <p className="font-['Jost'] text-sm text-[#6B5E54] font-300 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-end gap-6 mb-8">
              <span className="font-['Cormorant_Garamond'] text-4xl font-700 text-[#2A2420]">
                ${product.price}
              </span>
              <span className="font-['Jost'] text-xs text-[#8B7D72] font-300 pb-1.5">Free shipping over $100</span>
            </div>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full bg-[#2A2420] text-[#F5F0EB] font-['Jost'] text-sm font-500 tracking-[0.1em] uppercase py-4 hover:bg-[#8B6914] transition-colors duration-300"
            >
              Add to Cart
            </button>

            <div className="mt-8 pt-6 border-t border-[#E8E0D6] grid grid-cols-3 gap-4">
              {[
                { label: "Material", value: "Natural" },
                { label: "Origin", value: "Handmade" },
                { label: "Care", value: "Easy" },
              ].map(detail => (
                <div key={detail.label}>
                  <span className="font-['Jost'] text-[10px] uppercase tracking-[0.15em] text-[#8B7D72] font-500 block mb-1">
                    {detail.label}
                  </span>
                  <span className="font-['Jost'] text-sm text-[#2A2420] font-400">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}