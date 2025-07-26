import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import type { MenuCuentaItem } from "../../interfaces/sidebarMenuUser";

interface SidebarMenuProps {
  title?: string;
  menuData: MenuCuentaItem[];
}

export const CustomSidebarMenu = ({ title = "Mi Cuenta", menuData }: SidebarMenuProps) => {
  return (
    <aside className="w-full max-w-full md:w-[320px] md:sticky top-[96px] h-fit bg-white rounded-xl border border-gray-200 shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <ul className="space-y-2">
        {menuData.map(({ label, path, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center justify-between gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium group ${
                  isActive
                    ? "bg-primary text-white border-primary shadow"
                    : "bg-gray-50 hover:bg-primary/10 text-gray-700 border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`text-lg transition-colors duration-200 ${
                        isActive ? "text-white" : "text-primary"
                      }`}
                    />
                    <span className=" text-sm sm:text-sm">{label}</span>
                  </div>
                  <FaChevronRight
                    className={`text-xs transform transition-transform duration-200 ${
                      isActive
                        ? "text-white translate-x-1"
                        : "text-gray-500 group-hover:translate-x-1"
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
