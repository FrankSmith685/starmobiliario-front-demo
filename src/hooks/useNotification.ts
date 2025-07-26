import { api, apiWithAuth } from "../api/apiConfig";
import { handleApiError } from "../api/apiError";
import type {  PreferenciaNotificacion, PreferenciasResponse, TipoNotificacion, TipoNotificacionResponse } from "../interfaces/notificacion";

export const useNotification = () => {

  const getAllTipoNotificaciones = async (
    callback?: (types: TipoNotificacion[]) => void
  ): Promise<void> => {
    try {
      const response = await api.get<TipoNotificacionResponse>("/notification/tipo-notificaciones");
      const { data, success } = response.data;
      if (success && data) {
        callback?.(data);
      } else {
        console.warn("No se encontraron tipos de notificación.");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

    const getNotificacionesPorCorreo = async (
        callback?: (notifs: PreferenciaNotificacion[]) => void
        ): Promise<void> => {
        try {
            const response = await apiWithAuth.get<PreferenciasResponse>(`/notification/obtener-notificaciones`);
            const { data, success } = response.data;

            if (success && data) {
            callback?.(data);
            } else {
            console.warn("No se encontraron notificaciones para el usuario.");
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const actualizarEstadoNotificacion = async (
        id: number,
        activo: boolean,
        callback?: (success: boolean) => void
    ): Promise<void> => {
        try {
        const response = await apiWithAuth.patch(`/notification/actualizar-estado-notificacion/${id}`, {
            activo
        });

        const { success } = response.data;
        callback?.(success);
        } catch (error) {
        handleApiError(error);
        callback?.(false);
        }
    };


  return {
    getAllTipoNotificaciones,
    getNotificacionesPorCorreo,
    actualizarEstadoNotificacion
  };
};
