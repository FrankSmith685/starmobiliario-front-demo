import { useParams, Navigate } from "react-router-dom";
import { menuActividadData } from "./data/menuActividadData";
import Contactos from "./submenu/contactos/Contactos";
import Favoritos from "./submenu/favoritos/Favoritos";
import Historial from "./submenu/historial/Historial";
import Descartados from "./submenu/descartados/Descartados";
import BusquedasAlertas from "./submenu/busquedasAlertas/BusquedasAlertas";
import { CustomSidebarMenu } from "../../ui/CustomSidebarMenuUser";

const Actividad = () => {
  const { suboption } = useParams<{ suboption?: string }>();

  const validOptions = ["contactos", "favoritos", "historial", "descartados","busquedas-alertas"];

  if (!suboption || !validOptions.includes(suboption)) {
    return <Navigate to="/panel/actividad/contactos" replace />;
  }

  const renderSubComponent = () => {
    switch (suboption) {
      case "contactos":
        return <Contactos />;
      case "favoritos":
        return <Favoritos />;
      case "historial":
        return <Historial />;
      case "descartados":
        return <Descartados />;
      case "busquedas-alertas":
        return <BusquedasAlertas />;
    }
  };

  return (
    <div className="flex gap-6 flex-wrap md:flex-nowrap px-0">

      <CustomSidebarMenu
        title="Mi Actividad"
        menuData={menuActividadData}
      />

      <main className="flex-1 bg-white px-6">
        {renderSubComponent()}
      </main>
    </div>
  );
};

export default Actividad;
