import React from "react";

interface TabSelectorProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const tabs = ["Venta", "Alquiler", "Temporada"];

const TabSelector: React.FC<TabSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="inline-flex rounded-sm border border-gray-300 overflow-hidden shadow-sm bg-white">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`relative px-5 h-[44px] md:h-[55px] text-sm font-medium transition-all duration-200 hover:cursor-pointer
            ${selected === tab 
              ? "bg-primary text-white font-semibold" 
              : "text-gray-500  hover:bg-primary"}
          `}
        >
          {tab}
          {index < tabs.length - 1 && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-5 bg-gray-300"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
