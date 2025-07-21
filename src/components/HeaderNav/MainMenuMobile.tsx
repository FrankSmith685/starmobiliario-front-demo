import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { CustomButton } from "../ui/CustomButton";
import { quickAccess } from "./data/menuData";
import { mobileMenuData as menuData } from "./data/menuData.mobile";
import { useAppState } from "../../hooks/useAppState";
import { useAuth } from "../../hooks/useAuth";

const MainMenuMobile = () => {
  const [openMainSection, setOpenMainSection] = useState<string | null>(null);
  const [openSubSections, setOpenSubSections] = useState<{ [key: string]: boolean }>({});
  const [openColumnByTab, setOpenColumnByTab] = useState<{ [tabKey: string]: string | null }>({});
  const [openColumnBySection, setOpenColumnBySection] = useState<{ [sectionLabel: string]: string | null }>({});
  const [showMenuUser, setShowMenuUser] = useState<boolean>(true);
  const {setMode, setModal, user,setMenuOpen, setModeLogin} = useAppState();
  const {logout} = useAuth();

  const toggleColumnInTab = (tabKey: string, colTitle: string) => {
      setOpenColumnByTab((prev) => ({
          ...prev,
          [tabKey]: prev[tabKey] === colTitle ? null : colTitle,
      }));
  };

  const toggleColumnInSection = (sectionLabel: string, colTitle: string) => {
    setOpenColumnBySection((prev) => ({
        ...prev,
        [sectionLabel]: prev[sectionLabel] === colTitle ? null : colTitle,
    }));
  };

  const toggleMainSection = (label: string) => {
    setOpenMainSection((prev) => (prev === label ? null : label));
  };

  const toggleSubSection = (label: string) => {
    setOpenSubSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleClickIngresar = (): void => {
    setModal(true);
    setMode("login");
    setModeLogin('login_one');
  };

  const handleClickPublicar = (): void => {
    console.log("publicar");
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  };

  const handleClickShowMenu=()=>{
    setShowMenuUser(!showMenuUser);
  }

  const quickAccessToShow = user
  ? quickAccess
  : quickAccess.filter(item => item.label !== "Ayudar" && item.label !== "Cerrar sesión");

  const onLogout=()=>{
    logout();
    setModal(false);
    setMode('login');
    setMenuOpen(false);
  }


  return (
    <div className={`${showMenuUser ? 'space-y-2' : user ? 'space-y-2' :'space-y-4'} w-full px-4 py-4 `}>
      {/* Header login */}
      <div className={`${showMenuUser?'pb-4 space-y-4':'pb-2 space-y-2'} border-b-[1px]  border-b-gray-200  `}>
        <p className="text-sm text-gray-700">
          Ingresa y accede a los avisos que contactaste, tus favoritos y las búsquedas guardadas
        </p>
        {user ? (
          <div className="w-full flex items-center justify-between hover:cursor-pointer">
            <div className="flex items-center justify-start gap-4 w-full">
              <div className="flex items-center gap-1 cursor-pointer h-full">
                <div className="bg-emerald-900 text-white text-sm w-9 h-9 rounded-full flex items-center justify-center">
                  {getInitials(user?.nombre || user?.correo || "U")}
                </div>
                
              </div>
              <div className="w-full gap-0 flex flex-col" onClick={handleClickShowMenu}>
                <p className="text-gray-800 font-semibold">{user?.nombre}</p>
                <p className={`${user?.nombre != null ? 'text-gray-800 text-base' : 'font-semibold text-gray-700 text-base'}`}>{user?.correo}</p>
              </div>
            </div>
            {showMenuUser ? <FaChevronUp className="text-gray-800"/> : <FaChevronDown className="text-gray-800"/>}
          </div>
        ): (
          <CustomButton
            type="button"
            variant="primary"
            size="md"
            fontSize="14px"
            fontWeight={400}
            fullWidth={true}
            text="Ingresar"
            onClick={handleClickIngresar}
          />
        )}
      </div>
      <div
          className={`
            bg-white rounded-md border-b-[1px] border-b-gray-200
            overflow-hidden transition-all duration-300
            ${showMenuUser ? 'max-h-[500px] opacity-100 py-0' : user ? 'max-h-0 opacity-0 py-0': 'max-h-[500px] opacity-100 py-0'}
          `}
        >
          <ul className="divide-y divide-gray-200 text-sm text-gray-800">
            {quickAccessToShow.map((item, index) => (
              <li
                key={index}
                className={`p-3 flex items-center gap-2 transition-colors cursor-pointer 
                  ${item.label === "Cerrar sesión" ? "text-red-800 hover:bg-red-100" : "hover:bg-primary"}
                `}
                onClick={item.isLogout ? onLogout : undefined}
              >
                {item.icon && <item.icon className={`${item.label === "Cerrar sesión" ? "text-red-700 hover:bg-red-100" : "hover:bg-primary"}`}/>}
                {item.label}
              </li>
            ))}
          </ul>
        </div>

      {/* Botón publicar */}
      <div className={`${showMenuUser ? 'pt-2' : 'pt-0'} pb-4 border-b-[1px] border-b-gray-200`}>
        <CustomButton
          type="button"
          variant="primary-outline"
          size="md"
          fontSize="14px"
          fontWeight={400}
          fullWidth={true}
          text="Publicar"
          onClick={handleClickPublicar}
        />
      </div>

      {/* Menú dinámico principal */}
      <div>
        {menuData.map((section) => (
          <div key={section.label} className="border-b border-gray-200 ">
            {/* Botón principal */}
            {(section.columns || section.tabs) ? (
                <button
                    className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-800 hover:cursor-pointer"
                    onClick={() => toggleMainSection(section.label)}
                >
                    <span>{section.label}</span>
                    {openMainSection === section.label ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                ) : (
                <div className="py-3 text-left font-medium text-gray-800">
                    {section.label}
                </div>
            )}

            {/* Contenido desplegado */}
            <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openMainSection === section.label
                ? "max-h-[999px] opacity-100 py-2 pl-2"
                : "max-h-0 opacity-0 py-0 pl-2"
            } text-sm text-gray-700 space-y-2`}
            >
            {/* Si tiene tabs (como "Alquilar") */}
            {section.tabs
                ? section.tabs.map((tab) => {
                    const tabKey = `${section.label}-${tab.title}`;
                    const isTabOpen = openSubSections[tabKey];

                    return (
                    <div
                        key={tab.title}
                        className="border-b border-gray-200 rounded-md overflow-hidden"
                    >
                        <button
                        className="w-full flex justify-between items-center py-2 px-2 cursor-pointer"
                        onClick={() => toggleSubSection(tabKey)}
                        >
                        <span
                            className={`${
                            isTabOpen ? "text-primary font-semibold" : "text-gray-800"
                            }`}
                        >
                            {tab.title}
                        </span>
                        {isTabOpen ? (
                            <FaChevronUp className="text-primary" />
                        ) : (
                            <FaChevronDown className="text-gray-500" />
                        )}
                        </button>

                        <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isTabOpen ? "max-h-[1000px] py-2 px-4" : "max-h-0 py-0 px-4"
                        } space-y-2`}
                        >
                        {tab.columns.map((col, idx) => {
                            const isOpen = openColumnByTab[tabKey] === col.title;

                            return (
                            <div
                                key={idx}
                                className={`rounded-md overflow-hidden ${
                                isOpen ? "bg-primary-hover" : "bg-white"
                                }`}
                            >
                                <button
                                className="w-full flex justify-between items-center py-2 px-2 border-b border-gray-200 cursor-pointer"
                                onClick={() => toggleColumnInTab(tabKey, col.title)}
                                >
                                <span
                                    className={`${
                                    isOpen
                                        ? "text-primary font-semibold"
                                        : "text-gray-800"
                                    }`}
                                >
                                    {col.title}
                                </span>
                                {isOpen ? (
                                    <FaChevronUp className="text-primary" />
                                ) : (
                                    <FaChevronDown className="text-gray-500" />
                                )}
                                </button>

                                <ul
                                className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
                                    isOpen ? "max-h-[500px] py-2" : "max-h-0 py-0"
                                }`}
                                >
                                {col.items.map((item, i) => (
                                    <li
                                    key={i}
                                    className="text-gray-600 py-2 cursor-pointer"
                                    >
                                    {item}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    );
                })
                : section.columns?.map((col, colIdx) => {
                    const isOpen = openColumnBySection[section.label] === col.title;

                    return (
                    <div
                        key={colIdx}
                        className={`rounded-md overflow-hidden ${
                        isOpen ? "bg-primary-hover" : "bg-white"
                        }`}
                    >
                        <button
                        className="w-full flex justify-between items-center py-2 px-2 border-b border-gray-200 cursor-pointer"
                        onClick={() => toggleColumnInSection(section.label, col.title)}
                        >
                        <span
                            className={`${
                            isOpen ? "text-primary font-semibold" : "text-gray-800"
                            }`}
                        >
                            {col.title}
                        </span>
                        {isOpen ? (
                            <FaChevronUp className="text-primary" />
                        ) : (
                            <FaChevronDown className="text-gray-500" />
                        )}
                        </button>

                        <ul
                        className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? "max-h-[500px] py-2" : "max-h-0 py-0"
                        }`}
                        >
                        {col.items.map((item, i) => (
                            <li
                            key={i}
                            className="text-gray-600 py-2 cursor-pointer"
                            >
                            {item}
                            </li>
                        ))}
                        </ul>
                    </div>
                    );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenuMobile;
