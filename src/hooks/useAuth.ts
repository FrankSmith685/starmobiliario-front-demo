/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../api/apiConfig";
import { handleApiError } from "../api/apiError";
import type { RegisterAuthResponse } from "../interfaces/auth";
import { useAppState } from "./useAppState";

export const useAuth = () => {

    const {setRefreshtoken,setAccessToken, setUser, setModal, setModeLogin,setMode, setMenuOpen } = useAppState();

    const verifyEmail = async (
        email: string,
        callback?: (exists: boolean) => void
    ): Promise<void> => {
        try {
            const response = await api.get(`/auth/verify-email`, {
                params: { email }
            });

            const { success } = response.data;
            callback?.(success);
        } catch (error) {
            handleApiError(error);
            callback?.(false);
        }
    };

    const loginUser = async (
        credentials: { correo: string; contraseña: string },
        callback?: (response: { success: boolean; message?: string }) => void
    ): Promise<void> => {
        try {
        const response = await api.post<RegisterAuthResponse>("/auth/login", credentials);
        const { success, message, accessToken, refreshToken } = response.data;

            if (success && accessToken && refreshToken) {
                setAccessToken(accessToken);
                setRefreshtoken(refreshToken);
                callback?.({ success, message });
            }
        } catch (error:any) {
            handleApiError(error);
            callback?.({ success: false, message: error.response.data.message});
        }
    };

    const registerUser = async (
        data: {
            tipoUsuario: number;
            correo: string;
            contraseña: string;
            nombre?: string | null;
            apellido?: string | null;
            razon_social?: string | null;
            tipoDocumento?: number | null;
            nroDocumento?: string | null;
            telefono?: string | null;
            telefono_movil?: string | null;
        },
        callback?: (response: { success: boolean; message?: string }) => void
        ): Promise<void> => {
        try {
            const response = await api.post<RegisterAuthResponse>(`/auth/register`, data);
            const { success, message, accessToken, refreshToken } = response.data;
            callback?.({ success, message });
            if(accessToken && refreshToken) {
                setAccessToken(accessToken);
                setRefreshtoken(refreshToken);
            }
        } catch (error:any) {
            handleApiError(error);
            callback?.({ success: false, message: error.response.data.message});
        }
    };

    const logout = (): void => {
        setAccessToken(null);
        setRefreshtoken(null);
        setUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setModal(false)
        setMode('auth');
        setModeLogin('login_one');
        setMenuOpen(false);
    };

   const sendResetEmail = async (
        correo: string,
        callback?: (response: { success: boolean; message?: string }) => void
        ): Promise<void> => {
        try {
            const response = await api.post(`/auth/send-reset-email`, { correo });
            const { success, message } = response.data;
            callback?.({ success, message });
        } catch (error: any) {
            handleApiError(error);
            callback?.({
            success: false,
            message: error.response?.data?.message || 'Error al enviar el correo de recuperación.',
            });
        }
    };

    const validateResetToken = async (
        token: string,
        callback?: (isValid: boolean, message?: string) => void
    ): Promise<void> => {
        try {
            const response = await api.post(`/auth/validate-reset-token`, {
                token
            });
            const { success, message } = response.data;
            callback?.(success, message);
        } catch (error: any) {
            handleApiError(error);
            callback?.(false, error.response?.data?.message || 'Token inválido o expirado');
        }
    };

    const resetPassword = async (
        token: string,
        nuevaContraseña: string,
        callback?: (response: { success: boolean; message?: string }) => void
        ): Promise<void> => {
        try {
            const response = await api.post(`/auth/reset-password`, {
            token,
            nuevaContraseña,
            });
            const { success, message } = response.data;
            callback?.({ success, message });
        } catch (error: any) {
            handleApiError(error);
            callback?.({
            success: false,
            message: error.response?.data?.message || 'Error al restablecer la contraseña.',
            });
        }
    };

    return {
        verifyEmail,
        registerUser,
        logout,
        loginUser,
        sendResetEmail,
        validateResetToken,
        resetPassword
    };
};
