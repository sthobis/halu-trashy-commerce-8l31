import React from "react";

interface CategoryFiltersProps {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryFilters({ categories, selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-2 pb-8 overflow-x-auto scrollbar-hide">
      <span className="font-['Jost'] text-[10px] uppercase tracking-[0.2em] text-[#8B7D72] mr-3 font-500 shrink-0">Filter</span>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`font-['Jost'] text-sm font-400 px-5 py-2.5 border transition-all duration-300 shrink-0 ${
            selected === cat
              ? "bg-[#2A2420] text-[#F5F0EB] border-[#2A2420]"
              : "bg-transparent text-[#6B5E54] border-[#C4B8AA] hover:border-[#2A2420] hover:text-[#2A2420]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}