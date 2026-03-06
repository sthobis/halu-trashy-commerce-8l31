import React from "react";
import { Product } from "../types";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={star <= Math.round(rating) ? "#8B6914" : "none"}
          stroke="#8B6914"
          strokeWidth="0.8"
        >
          <polygon points="6,1 7.5,4.2 11,4.6 8.5,7 9.2,10.5 6,8.8 2.8,10.5 3.5,7 1,4.6 4.5,4.2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductGrid({ products, onProductClick, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {products.map(product => (
        <div key={product.id} className="group">
          <div
            onClick={() => onProductClick(product)}
            className="relative aspect-[4/5] bg-[#E8E0D6] overflow-hidden cursor-pointer mb-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#2A2420]/0 group-hover:bg-[#2A2420]/10 transition-colors duration-500" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="absolute bottom-4 left-4 right-4 bg-[#2A2420] text-[#F5F0EB] font-['Jost'] text-sm font-400 py-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#8B6914]"
            >
              Add to Cart
            </button>
            <div className="absolute top-3 left-3">
              <span className="font-['Jost'] text-[10px] uppercase tracking-[0.15em] bg-[#F5F0EB]/90 backdrop-blur-sm text-[#6B5E54] px-2.5 py-1 font-500">
                {product.category}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3
              onClick={() => onProductClick(product)}
              className="font-['Cormorant_Garamond'] text-lg font-600 cursor-pointer hover:text-[#8B6914] transition-colors leading-tight"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="font-['Jost'] text-[11px] text-[#8B7D72] font-300">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <p className="font-['Jost'] text-base font-500 text-[#2A2420]">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}