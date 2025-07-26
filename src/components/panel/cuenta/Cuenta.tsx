import { useParams, Navigate } from "react-router-dom";
import Datos from "./submenus/datos/Datos";
import Password from "./submenus/password/Password";
import { menuCuentaData } from "./data/menuCuentaData";
import Correo from "./submenus/correo/Correo";
import Notificaciones from "./submenus/notificaciones/Notificaciones";
import Eliminar from "./submenus/eliminar/Eliminar";
import { CustomSidebarMenu } from "../../ui/CustomSidebarMenuUser";

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
      <CustomSidebarMenu
          title="Mi Cuenta"
          menuData={menuCuentaData}
      />
      <main className="flex-1 bg-white px-6">
        {renderSubComponent()}
      </main>
    </div>
  );
};

export default Cuenta;
