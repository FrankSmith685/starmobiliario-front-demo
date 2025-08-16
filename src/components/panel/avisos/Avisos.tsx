/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../ui/CustomAlert";
import { CustomButton } from "../../ui/CustomButton";
import CustomImage from "../../ui/CustomImage";
import FilterPanel from "./components/FilterAviso";
import NoResultsHeader from "./components/NoResultsHeader";
import PendingTask from "./components/PendingTask";
import ProductoState from "./components/ProductoState";
import { useEffect, useState } from "react";
import { useAppState } from "../../../hooks/useAppState";
import { useAvisos } from "../../../hooks/useAvisos";
import type { AvisosDTO } from "../../../interfaces/avisos";
import ListaAvisos from "./components/ListaAvisos";

const Avisos = () => {
  const [mensajeBienvenida, setMensajeBienvenida] = useState("Cargando avisos...");
  const {setListaAvisos, setFiltroAvisos, filtroAvisos, listaAvisos} = useAppState();
  const {getAvisos} = useAvisos();
  const navigate=useNavigate();
  const handleClickPublicarAvisos=()=>{
    navigate("/panel/publicador/principales/operacionypropiedad")
  }
  const [alertVariant, setAlertVariant] = useState<"primary" | "secondary" | "warning">("primary");
  useEffect(() => {
    getAvisos((data) => {
      setListaAvisos(data as AvisosDTO);
      setFiltroAvisos(data.avisos);

      const publicados = data.avisos.filter(a => a.estado == "publicado");
      const borradores = data.avisos.filter(a => a.estado == "Incompleto");

      if (data.avisos.length === 0) {
        setMensajeBienvenida("Aún no tienes avisos. Crea tu primer aviso.");
        setAlertVariant("primary");
      } else if (publicados.length > 0) {
        setMensajeBienvenida("¡Tus avisos están activos!");
        setAlertVariant("primary");
      } else if (borradores.length > 0 && data.productos_disponibles === 0) {
        setMensajeBienvenida("Tienes avisos en borrador pero sin productos disponibles.");
        setAlertVariant("secondary");
      } else if (borradores.length > 0) {
        setMensajeBienvenida("Tienes avisos en borrador. Complétalos para publicarlos.");
        setAlertVariant("secondary");
      } else {
        setMensajeBienvenida("¡Te damos la bienvenida al panel de avisos!");
        setAlertVariant("primary");
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <CustomAlert
        message={mensajeBienvenida}
        variant={alertVariant}
      />
      <PendingTask/>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <div className="w-full flex md:flex-row flex-col items-start justify-center gap-4">
          <FilterPanel/>
          <div className="w-full flex flex-col gap-4">
            <ProductoState/>
            {/* <> */}
              <div className="w-full h-auto flex flex-col gap-4 flex-1">
                <NoResultsHeader />
                {listaAvisos.avisos.length === 0 ? (
                  <div className="w-full h-auto relative flex flex-col items-center justify-center gap-4">
                    <div className="w-full gap-1 flex flex-col items-center justify-center">
                      <CustomImage
                        name="not_found_avisos"
                        alt="not_found_avisos"
                        width={300}
                        className="absolute w-full !h-[full] object-cover"
                      />
                      <p className="w-full text-gray-800 font-bold text-xl text-center">
                        No encontramos ningún aviso
                      </p>
                      <p className="text-gray-800 w-full text-center text-sm">
                        Todavía no tienes ningún aviso publicado
                      </p>
                    </div>
                    <CustomButton
                      type="button"
                      variant="primary"
                      size="md"
                      fontSize="14px"
                      fontWeight={600}
                      text="Continuar"
                      onClick={handleClickPublicarAvisos}
                    />
                  </div>
                ) : filtroAvisos.length === 0 ? (
                  <div className="w-full gap-1 flex flex-col items-center justify-center">
                    <p className="w-full text-gray-800 font-bold text-xl text-center">
                      No encontramos ningún elemento que coincida con tu búsqueda.
                    </p>
                    <p className="text-gray-800 w-full text-center text-sm">
                      Prueba eliminando alguno de los filtros o utilizando otros términos.
                    </p>
                  </div>
                ) : (
                  <ListaAvisos />
                )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Avisos;
