import { useParams, NavLink, Navigate } from "react-router-dom";
import Contactos from "./contactos/Contactos";
import Favoritos from "./favoritos/Favoritos";

const Actividad = () => {
  const { suboption } = useParams<{ suboption?: string }>();

  // Redirige automáticamente a /panel/cuenta/datos si no hay suboption
  if (!suboption) {
    return <Navigate to="/panel/actividad/contactos" replace />;
  }

  const renderSubComponent = () => {
    switch (suboption) {
      case "contactos":
        return <Contactos />;
      case "favoritos":
        return <Favoritos />;
      default:
        return <div>Selecciona una opción de actividad</div>;
    }
  };

  return (
    <div className="flex gap-8">
      {/* Menú lateral */}
      <div className="w-1/4 border-r pr-4">
        <h2 className="text-lg font-semibold mb-4">Mi Actividad</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/panel/cuenta/datos"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Datos de cuenta
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/panel/cuenta/password"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Cambiar contraseña
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1">{renderSubComponent()}</div>
    </div>
  );
};

export default Actividad;
