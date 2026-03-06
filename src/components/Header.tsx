import React from "react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F0EB]/90 backdrop-blur-md border-b border-[#D4C9BC]/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#8B6914] flex items-center justify-center">
            <span className="font-['Cormorant_Garamond'] text-white text-sm font-700">M</span>
          </div>
          <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-600 tracking-[0.15em] uppercase">Matière</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-['Jost'] text-sm font-400 text-[#6B5E54]">
          <a href="#" className="hover:text-[#2A2420] transition-colors">New Arrivals</a>
          <a href="#" className="hover:text-[#2A2420] transition-colors">Collections</a>
          <a href="#" className="hover:text-[#2A2420] transition-colors">About</a>
        </nav>

        <button
          onClick={onCartClick}
          className="relative group flex items-center gap-2 font-['Jost'] text-sm font-400 hover:text-[#8B6914] transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-3 w-5 h-5 bg-[#8B6914] text-white text-[10px] font-500 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}