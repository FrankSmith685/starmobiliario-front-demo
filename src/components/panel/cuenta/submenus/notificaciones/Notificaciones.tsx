/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNotification } from "../../../../../hooks/useNotification";
import type { TipoNotificacion } from "../../../../../interfaces/notificacion";
import { CustomSwitch } from "../../../../ui/CustomSwitch";

const Notificaciones = () => {
  const { getAllTipoNotificaciones, getNotificacionesPorCorreo, actualizarEstadoNotificacion } = useNotification();
  const [tiposNotificacion, setTiposNotificacion] = useState<TipoNotificacion[]>([]);
  const [estadoSwitch, setEstadoSwitch] = useState<Record<number, boolean>>({});

  useEffect(() => {
  getAllTipoNotificaciones((tipos) => {
    setTiposNotificacion(tipos);

    getNotificacionesPorCorreo((notifs) => {
      const estadoInicial: Record<number, boolean> = {};
      tipos.forEach((tipo) => {
        const notifUsuario = notifs.find(n => n.cod_tipo_notificaciones === tipo.cod_tipo_notificaciones);
        estadoInicial[tipo.cod_tipo_notificaciones] = notifUsuario?.activo ?? false;
      });
      setEstadoSwitch(estadoInicial);
    });
  });
}, []);


  const toggleSwitch = (codTipoNotificacion: number) => {
    const nuevoEstado = !estadoSwitch[codTipoNotificacion];

    setEstadoSwitch((prev) => ({
      ...prev,
      [codTipoNotificacion]: nuevoEstado,
    }));

    actualizarEstadoNotificacion(codTipoNotificacion, nuevoEstado);

  };

  return (
    <div className="w-full">
  <h3 className="text-xl sm:text-2xl font-bold mb-2">Ajustes de notificaciones</h3>
  <p className="text-gray-600 text-sm sm:text-base mb-6">
    Activa las suscripciones para recibir novedades en tu correo electrónico.
  </p>

  <div className="space-y-5">
    {tiposNotificacion.map((tipo) => {
      const activo = estadoSwitch[tipo.cod_tipo_notificaciones];
      return (
        <div
          key={tipo.cod_tipo_notificaciones}
          className={`flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-xl p-4 sm:p-5 transition-all duration-300 border 
            ${activo ? "bg-green-50 border-green-300" : "bg-white border-gray-200"} 
            hover:shadow-md`}
        >
          <div className="w-full sm:max-w-[75%] mb-4 sm:mb-0">
            <h4 className="font-semibold text-base sm:text-lg text-gray-900">{tipo.nombre}</h4>
            <p className="text-gray-600 text-sm mt-1">{tipo.description}</p>
          </div>

          <div className="self-end sm:self-auto">
            <CustomSwitch
              checked={!!activo}
              onChange={() => toggleSwitch(tipo.cod_tipo_notificaciones)}
              variant={activo ? "primary" : "secondary"}
              size="lg"
              label=""
            />
          </div>
        </div>
      );
    })}
  </div>
</div>

  );
};

export default Notificaciones;
