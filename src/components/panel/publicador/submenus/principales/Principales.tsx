import { useParams, Navigate } from "react-router-dom";
import OperacionYPropiedad from "./submenus/propiedadesyoperaciones/OperacionYPropiedad";
import Ubicacion from "./submenus/ubicacion/Ubicacion";
import Caracteristicas from "./submenus/caracteristicas/Caracterisiticas";
import { menuPrincipalesData } from "./data/menuPrincipalesData";
import { CustomSidebarMenu } from "../../../../ui/CustomSidebarMenuUser";

const Cuenta = () => {
  const { subsuboption } = useParams<{ subsuboption?: string }>();

  const validOptions = ["operacionypropiedad", "ubicacion", "caracteristicas"];

  if (!subsuboption || !validOptions.includes(subsuboption)) {
    return <Navigate to="/panel/publicador/principales/operacionypropiedad" replace />;
  }

  const renderSubComponent = () => {
    switch (subsuboption) {
      case "operacionypropiedad":
        return <OperacionYPropiedad />;
      case "ubicacion":
        return <Ubicacion />;
      case "caracteristicas":
        return <Caracteristicas />;
    }
  };

  return (
    <div className="flex gap-6 flex-wrap md:flex-nowrap px-0">
        <CustomSidebarMenu
            title="Principales"
            menuData={menuPrincipalesData}
        />
        <main className="flex-1 bg-white px-6">
            {renderSubComponent()}
        </main>
    </div>
  );
};

export default Cuenta;
