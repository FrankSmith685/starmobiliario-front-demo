import { useState, useRef, useEffect } from "react";
import CustomLogo from "../ui/CustomLogo";
import MainMenu from "./MainMenu";
import UserActions from "./UserActions";
import { FaBars } from "react-icons/fa";

const HeaderNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="w-full px-4 py-2 shadow-sm bg-white flex justify-between items-center relative">
      {/* Logo + Menú (desktop) */}
      <div className="flex items-center gap-6">
        <CustomLogo isActive={true} />
        <div className="hidden lg:flex">
          <MainMenu />
        </div>
      </div>

      {/* Acciones + menú móvil */}
      <div className="flex items-center gap-2">
        <UserActions />

        {/* Botón hamburguesa */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <FaBars />
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden z-50 transition-all duration-300 opacity-100 scale-y-100 origin-top transform"
        >
          <MainMenu />
        </div>
      )}
    </header>
  );
};

export default HeaderNav;

