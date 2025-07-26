import { useParams, NavLink, Navigate } from "react-router-dom";
import Datos from "./submenus/datos/Datos";
import Password from "./submenus/password/Password";
import { menuCuentaData } from "./data/menuCuentaData";
import { FaChevronRight } from "react-icons/fa";
import Correo from "./submenus/correo/Correo";
import Notificaciones from "./submenus/notificaciones/Notificaciones";
import Eliminar from "./submenus/eliminar/Eliminar";

const Cuenta = () => {
  const { suboption } = useParams<{ suboption?: string }>();

  const validOptions = ["datos", "password", "email", "notificaciones", "eliminar"];

  if (!suboption || !validOptions.includes(suboption)) {
    return <Navigate to="/panel/cuenta/datos" replace />;
  }

  const renderSubComponent = () => {
    switch (suboption) {
      case "datos":
        return <Datos />;
      case "password":
        return <Password />;
      case "email":
        return <Correo />;
      case "notificaciones":
        return <Notificaciones />;
      case "eliminar":
        return <Eliminar />;
    }
  };

  return (
    <div className="flex gap-6 flex-wrap md:flex-nowrap px-0">
      {/* Menú lateral */}
      <aside className="w-full max-w-full md:max-w-xs md:sticky top-[96px] h-fit bg-white rounded-xl border border-gray-200 shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mi Cuenta</h2>
        <ul className="space-y-2">
          {menuCuentaData.map(({ label, path, icon: Icon }) => (
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
                      <span>{label}</span>
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

      {/* Contenido dinámico */}
      <main className="flex-1 bg-white px-6">
        {renderSubComponent()}
      </main>
    </div>
  );
};

export default Cuenta;
