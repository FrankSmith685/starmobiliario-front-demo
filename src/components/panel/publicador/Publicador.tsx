import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Principales from "./submenus/principales/Principales";
import Multimedia from "./submenus/multimedia/Multimedia";
import Extras from "./submenus/extras/Extras";
import Publicar from "./submenus/publicar/Publicar";

import { CustomStepProgressBar } from "../../ui/CustomStepProgressBar";
import { steps } from "./data/menuStepPublicador";
import { useAppState } from "../../../hooks/useAppState";
import CompletedUser from "./components/completedUser";
// import FormularioContactoModal, { FormData } from "./FormularioContactoModal";

const Publicador = () => {
  const { suboption } = useParams<{ suboption?: string }>();
  const { progressProperty, user } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (user?.tipo_registro === "Parcial") {
      setShowModal(true);
    }
  }, [user]);

  const onFormSuccess = () => {
    console.log("ACTUALIZO")
    setShowModal(false);
  };

  const validOptions = ["principales", "multimedia", "extras", "publicar"];

  const stepMapping: Record<string, number> = {
    principales: 1,
    multimedia: 2,
    extras: 3,
    publicar: 4,
  };

  if (
    !suboption ||
    !validOptions.includes(suboption) ||
    progressProperty.step < stepMapping[suboption]
  ) {
    return <Navigate to="/panel/publicador/principales" replace />;
  }

  const renderSubComponent = () => {
    switch (suboption) {
      case "principales":
        return <Principales />;
      case "multimedia":
        return <Multimedia />;
      case "extras":
        return <Extras />;
      case "publicar":
        return <Publicar />;
      default:
        return null;
    }
  };

  const handleClickClose = () => {
    setShowModal(false);
        navigate("/");
    }

  return (
    <div className="flex gap-6 flex-col px-0">
      <div className="w-full py-2 px-2 bg-white rounded-xl border border-gray-200 shadow-md">
        <CustomStepProgressBar steps={steps} currentPath={suboption} />
      </div>

      <main className="flex-1 bg-white px-0">{renderSubComponent()}</main>

      <CompletedUser
        isOpen={showModal}
        onClose={handleClickClose}
        onSuccess={onFormSuccess}
      />
    </div>
  );
};

export default Publicador;
