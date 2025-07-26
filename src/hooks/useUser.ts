import { api, apiWithAuth } from "../api/apiConfig";
import { handleApiError } from "../api/apiError";
import type { ChangeEmailRequest, ChangeEmailResponse, ChangePasswordRequest, ChangePasswordResponse, TypeUser, TypeUserResponse, UpdateUsuarioCompleto, UsuarioData, UsuarioResponse } from "../interfaces/user";
import { useAppState } from "./useAppState";

export const useUser = () => {

    const {setUser,setLoadingUser} = useAppState();

    const getAllUserTypes = async (
        callback?: (types: TypeUser[]) => void
        ): Promise<void> => {
        try {
            const response = await api.get<TypeUserResponse>("/user/user-type");
            const { data, success } = response.data;
            if (success && data) {
                callback?.(data);
            } else {
                console.warn("No se encontraron tipos de usuario.");
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const getUserInfo = async (
        callback?: (user: UsuarioData) => void
    ): Promise<void> => {
        try {
            setLoadingUser(true)
            const response = await apiWithAuth.get<UsuarioResponse>(`/user/user-info`);
            const { success, data, message } = response.data;

            if (success && data) {
                callback?.(data);
                setUser(data);
            } else {
                console.warn("No se encontró información del usuario. Mensaje:", message);
            }
        } catch (error) {
            handleApiError(error);
        } finally{
            setLoadingUser(false);
        }
    };

    const updateUser = async (
        data: UpdateUsuarioCompleto,
        callback?: (user: UsuarioData, message: string) => void
        ): Promise<void> => {
        try {
            const response = await apiWithAuth.put<UsuarioResponse>('/user/update-user', data);
            const { success, message, data: updatedUser } = response.data;

            if (success && updatedUser) {
                setUser(updatedUser);
                callback?.(updatedUser, message);
            } else {
            console.warn("Error al actualizar:", message);
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const changePassword = async (
        data: ChangePasswordRequest,
        callback?: (success: boolean, message: string) => void
        ): Promise<void> => {
        try {
            const response = await apiWithAuth.put<ChangePasswordResponse>('/user/change-password', data);
            const { success, message } = response.data;

            if (callback) callback(success, message);
        } catch (error) {
            handleApiError(error);
            if (callback) callback(false, "Error al cambiar la contraseña");
        }
    };

    const changeEmail = async (
        data: ChangeEmailRequest,
        callback?: (success: boolean, message: string) => void
        ): Promise<void> => {
        try {
            const response = await apiWithAuth.put<ChangeEmailResponse>('/user/change-email', data);
            const { success, message } = response.data;

            if (callback) callback(success, message);
        } catch (error) {
            handleApiError(error);
            if (callback) callback(false, "Error al cambiar el correo");
        }
    };

    const deleteOwnAccount = async (
        password: string,
        callback?: (success: boolean, message: string) => void
        ): Promise<void> => {
        try {
            const response = await apiWithAuth.delete('/user/delete-account', {
            data: { password },
            });
            const { success, message } = response.data;
            if (callback) callback(success, message);
        } catch (error) {
            handleApiError(error);
            if (callback) callback(false, "Error al eliminar la cuenta");
        }
    };


    return {
        getAllUserTypes,
        getUserInfo,
        updateUser,
        changePassword,
        changeEmail,
        deleteOwnAccount
    };
   
};