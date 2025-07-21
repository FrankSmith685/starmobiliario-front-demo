import { api, apiWithAuth } from "../api/apiConfig";
import { handleApiError } from "../api/apiError";
import type { TypeUser, TypeUserResponse, UsuarioData, UsuarioResponse } from "../interfaces/user";
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
            // if()
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

    return {
        getAllUserTypes,
        getUserInfo
    };
   
};