import { FaChevronDown } from "react-icons/fa";

const menuItems = [
  { label: "Comprar", hasSubmenu: true },
  { label: "Alquilar", hasSubmenu: true },
  { label: "Servicios", hasSubmenu: true },
  { label: "Buscar inmobiliarias", hasSubmenu: false },
];

const MainMenu = () => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6 px-4 py-2 md:p-0">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-1 text-sm text-gray-800 hover:text-violet-800 cursor-pointer transition"
        >
          {item.label}
          {item.hasSubmenu && <FaChevronDown className="text-xs mt-0.5" />}
        </div>
      ))}
    </nav>
  );
};

export default MainMenu;
