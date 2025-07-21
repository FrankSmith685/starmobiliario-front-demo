/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";
import { callLogoutFunction } from "../helpers/logoutHelper";

// Usa `import.meta.env` en Vite
const baseURL: string = import.meta.env.VITE_API_URL;
const imageUrl: string = import.meta.env.VITE_IMAGE_URL;


// Crear instancia base de Axios
export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Crear instancia de Axios con autenticación
export const apiWithAuth: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiWithAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    console.warn("ERROR INTERCEPTADO:", error.response?.status);

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("Intentando refrescar el token...");
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        callLogoutFunction();
        return Promise.reject(error);
      }

      try {
        const res = await apiWithAuth.post("/auth/refresh-token", { refreshToken });

        // Verificamos si el backend respondió con success: false
        if (res.data?.success === false) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          callLogoutFunction();
          return Promise.reject(error);
        }

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiWithAuth(originalRequest);
      } catch (refreshError: unknown) {
        if (axios.isAxiosError(refreshError)) {
          const success = refreshError.response?.data?.success;
          if (success === false) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        }

        callLogoutFunction();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// URL base para imágenes
export const imageBaseUrl: string = imageUrl;
