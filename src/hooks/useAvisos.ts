import { apiWithAuth } from "../api/apiConfig";
import { handleApiError } from "../api/apiError";
import type { AvisosDTO, AvisosResponse } from "../interfaces/avisos";

export const useAvisos = () => {

  const getAvisos = async (
    callback?: (avisos: AvisosDTO) => void
  ): Promise<void> => {
    try {
      const response = await apiWithAuth.get<AvisosResponse>("/avisos/obtener-avisos");
      const { data, success } = response.data;
      if (success && data) {
        callback?.(data);
      } else {
        console.warn("No se encontraron avisos.");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const archivarAvisos = async (
    codAvisos: string | string[]
  ): Promise<{ success: boolean; message: string } | undefined> => {
    try {
      const response = await apiWithAuth.post("/avisos/archivar-avisos", {
        codAvisos,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const restaurarAvisos = async (
    codAvisos: string | string[]
  ): Promise<{ success: boolean; message: string } | undefined> => {
    try {
      const response = await apiWithAuth.post("/avisos/restaurar-avisos", {
        codAvisos,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    getAvisos,
    archivarAvisos,
    restaurarAvisos
  };
};
