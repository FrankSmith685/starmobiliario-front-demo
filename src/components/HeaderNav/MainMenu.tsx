/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuData, quickAccess } from "./data/menuData";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../hooks/useAppState";

const MainMenu = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeAlquilarTab, setActiveAlquilarTab] = useState<string>("Alquilar");
  const {user} = useAppState();

  const location = useLocation();
  const isPanelRoute = location.pathname.startsWith("/panel");
   const navigate = useNavigate();

  const filteredItems = useMemo(() => {
  const isComplete = user?.tipo_registro === "Completo";

  return quickAccess.filter((item) => {
    // Si está completo, solo mostramos los que NO están activos
    if (isComplete) {
      return item.path && (item.isActive === false || item.isActive === undefined);
    }
    // Si está incompleto, solo mostramos los que sí están activos o no tienen estado definido
    return item.path && (item.isActive || item.isActive === undefined);
  });
}, [quickAccess, user?.tipo_registro]);


  const groupedByBase = useMemo(() => {
    const groups: { [key: string]: typeof filteredItems } = {};

    filteredItems.forEach((item) => {
      const match = item.path?.match(/^\/panel\/[^\/]+/); // match "/panel/actividad", "/panel/avisos", etc.
      const basePath = match?.[0] ?? "otros";

      if (!groups[basePath]) groups[basePath] = [];
      groups[basePath].push(item);
    });

    return groups;
  }, [filteredItems]);

  return (
    <nav className="z-50 bg-white h-[80px]">
      <div className="flex gap-0 items-center justify-center h-full px-0 w-full text-sm">
        {
          !isPanelRoute ? (
            <>
              {menuData.map((item, index) => (
                <div
                  key={index}
                  className="h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setActiveAlquilarTab("Alquilar");
                  }}
                >
                  {/* Botón principal */}
                  <div className="h-full px-0 py-0 rounded-md cursor-pointer flex items-center justify-center">
                    <div className="py-3 px-2 gap-1 flex items-center justify-center transition-all text-gray-700">
                      <span className={`text-sm mt-0.5 ${hoveredIndex === index ? "border-b-[1px] border-primary" : ""}`}>
                        {item.label}
                      </span>
                      {item.hasSubmenu &&
                        (hoveredIndex === index ? (
                          <FaChevronUp className="text-xs mt-0.5 text-gray-700" />
                        ) : (
                          <FaChevronDown className="text-xs mt-0.5 text-gray-700" />
                        ))}
                    </div>
                  </div>
                  {/* MEGA MENÚ para Alquilar con tabs */}
                  {item.label === "Alquilar" && hoveredIndex === index && (
                    <div className="absolute left-0 top-[80px] w-full flex justify-center z-50">
                      <div className="lg:w-[90%] bg-white shadow-lg border border-gray-200 rounded-lg flex">
                        {/* Tabs: Alquilar / Temporal */}
                        <div className="min-w-[120px] border-r border-gray-200 p-4 text-center bg-primary-hover">
                          {item.tabs?.map((tab, tabIndex) => (
                            <div
                              key={tabIndex}
                              onMouseEnter={() => setActiveAlquilarTab(tab.title)}
                              className={`px-2 py-1 mb-2 text-sm cursor-pointer rounded text-gray-700 ${
                                activeAlquilarTab === tab.title
                                  ? "border-b border-primary"
                                  : ""
                              }`}
                            >
                              {tab.title}
                            </div>
                          ))}
                        </div>

                        {/* Columnas del tab activo */}
                        <div className={`${activeAlquilarTab === "Alquilar" ? 'grid-cols-4' : 'grid-cols-3'} grid  gap-2 p-6 w-full`}>
                          {item.tabs
                            ?.find((tab) => tab.title === activeAlquilarTab)
                            ?.columns.map((col, colIndex) => (
                              <div key={colIndex}>
                                <h3 className="font-semibold mb-2 text-gray-800 text-base">
                                  {col.title}
                                </h3>
                                <ul className="text-gray-700 text-sm">
                                  {col.items.map((listItem, liIndex) => (
                                    <li
                                      key={liIndex}
                                      className="cursor-pointer hover:bg-primary transition px-3 py-1"
                                    >
                                      {listItem}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Otros mega menús como "Comprar,etc" */}
                  {item.megaMenu && item.columns && hoveredIndex === index && item.label !== "Alquilar" && (
                    <div className="absolute left-0 top-[80px] w-screen flex items-center justify-center z-50">
                      <div className="lg:w-[90%] bg-white shadow-lg border border-gray-200 rounded-lg">
                        <div className={`${item.label !== "Servicios" ? 'grid-cols-5' : 'grid-cols-4'} grid  gap-2 p-6`}>
                          {item.columns.map((col, colIndex) => (
                            <div key={colIndex}>
                              <h3 className="font-semibold mb-2 text-gray-800 text-base">{col.title}</h3>
                              <ul className="text-gray-700 text-sm">
                                {col.items.map((listItem, liIndex) => (
                                  <li
                                    key={liIndex}
                                    className="cursor-pointer hover:bg-primary transition px-3 py-1"
                                  >
                                    {listItem}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </>
          ):(
            <div className="flex gap-6 h-full items-center px-6">
              {Object.entries(groupedByBase).map(([base, items]) => {
                // Si hay solo un item, mostrarlo directamente
                if (items.length === 1) {
                  return (
                    <div
                      key={items[0].path}
                      className="cursor-pointer h-full flex items-center"
                      onClick={() => navigate(items[0].path!)}
                    >
                      <span
                        className={`text-sm border-b-2 pb-1 ${
                          location.pathname.startsWith(items[0].path!)
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-700"
                        }`}
                      >
                        {items[0].label}
                      </span>
                    </div>
                  );
                }

                const label = base.replace("/panel/", "");
                const prettyLabel = label.charAt(0).toUpperCase() + label.slice(1);

                return (
                  <div
                    key={base}
                    className="cursor-pointer h-full flex items-center"
                    onClick={() => navigate(items[0].path!)}
                  >
                    <span
                      className={`text-sm border-b-2 pb-1 ${
                        location.pathname.startsWith(base)
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-700"
                      }`}
                    >
                      {base.includes("actividad")
                        ? "Mi Actividad"
                        : base.includes("cuenta")
                        ? "Mi Cuenta"
                        : prettyLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          )
        }
       
      </div>
    </nav>
  );
};

export default MainMenu;
