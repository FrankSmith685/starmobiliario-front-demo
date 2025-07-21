import { useRef } from "react";
import CustomLogo from "../ui/CustomLogo";
import MainMenu from "./MainMenu";
import UserActions from "./UserActions";
import { FaBars, FaTimes } from "react-icons/fa";
import MainMenuMobile from "./MainMenuMobile";
import { useAppState } from "../../hooks/useAppState";

const HeaderNav = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const {menuOpen,setMenuOpen} = useAppState();

  return (
    <header className="w-full px-4 shadow-sm bg-white flex justify-between items-center relative h-[80px]">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <CustomLogo isActive={true} />
        <div className="hidden lg:flex">
          <MainMenu />
        </div>
      </div>

      {/* Acciones + menú móvil */}
      <div className="flex items-center gap-4 lg:gap-2">
        <UserActions menuOpen={menuOpen} />
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <FaBars className={`${menuOpen ? "hidden" : ""} text-gray-700 text-2xl hover:cursor-pointer`} />
          <FaTimes className={`${menuOpen ? "" : "hidden"} text-gray-700 text-2xl hover:cursor-pointer`} />
        </button>
      </div>

      {/* Menú móvil desplegable con animación */}
      <div
        ref={menuRef}
        className={`absolute top-full left-0 w-full border-t-gray-200 border-t-[1px] bg-white shadow-sm lg:hidden z-50 transform transition-all duration-300 origin-top overflow-hidden ${
          menuOpen ? "scale-y-100 opacity-100 max-h-[1000px]" : "scale-y-0 opacity-0 max-h-0"
        }`}
      >
        <MainMenuMobile />
      </div>
    </header>
  );
};

export default HeaderNav;
