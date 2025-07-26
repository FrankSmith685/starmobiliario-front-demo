import { useParams } from "react-router-dom";
import Avisos from "../../components/panel/avisos/Avisos";
import Cuenta from "../../components/panel/cuenta/Cuenta";
import Actividad from "../../components/panel/actividad/Actividad";
import Publicador from "../../components/panel/publicador/Publicador";

const PanelPage = () => {
  const { option } = useParams<{ option: string }>();

  const renderContent = () => {
    switch (option) {
        case "avisos":
          return <Avisos />;
        case "cuenta":
          return <Cuenta />;
        case "actividad":
          return <Actividad />;
        case "publicador":
          return <Publicador />;
      default:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Sección no encontrada</h2>
            <p>La opción <strong>{option}</strong> no es válida.</p>
          </div>
        );
    }
  };

  return (
    <div className="responsive-padding">
      {renderContent()}
    </div>
  );
};

export default PanelPage;
