import { useParams, Navigate } from "react-router-dom";
import OperacionYPropiedad from "./submenus/propiedadesyoperaciones/OperacionYPropiedad";
import Ubicacion from "./submenus/ubicacion/Ubicacion";
import Caracteristicas from "./submenus/caracteristicas/Caracterisiticas";
import { menuPrincipalesData } from "./data/menuPrincipalesData";
import { CustomSidebarMenu } from "../../../../ui/CustomSidebarMenuUser";
import { useAppState } from "../../../../../hooks/useAppState";

const Cuenta = () => {
  const { progressPrincipalProperty } = useAppState();
  const { subsuboption } = useParams<{ subsuboption?: string }>();

  // const allOptions = ["operacionypropiedad", "ubicacion", "caracteristicas"];

  // Define a helper map for steps
  const allowedOptionsByStep: { [key: number]: string[] } = {
    1: ["operacionypropiedad"],
    2: ["operacionypropiedad", "ubicacion"],
    3: ["operacionypropiedad", "ubicacion", "caracteristicas"],
  };

  const currentStep = progressPrincipalProperty.step;
  const validOptions = allowedOptionsByStep[currentStep] || [];

  if (!subsuboption || !validOptions.includes(subsuboption)) {
    return (
      <Navigate
        to={progressPrincipalProperty.currentPath}
        replace
      />
    );
  }

  const renderSubComponent = () => {
    switch (subsuboption) {
      case "operacionypropiedad":
        return <OperacionYPropiedad />;
      case "ubicacion":
        return <Ubicacion />;
      case "caracteristicas":
        return <Caracteristicas />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-6 flex-wrap md:flex-nowrap px-0">
      <CustomSidebarMenu
        title="Principales"
        menuData={menuPrincipalesData}
      />
      <main className="flex-1 bg-white pl-6">
        {renderSubComponent()}
      </main>
    </div>
  );
};

export default Cuenta;
