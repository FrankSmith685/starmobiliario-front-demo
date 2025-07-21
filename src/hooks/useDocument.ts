import { api } from "../api/apiConfig";
import { handleApiError } from "../api/apiError";
import type { TypeDocument, TypeDocumentResponse } from "../interfaces/document";

export const useDocument = () => {

    const getAllDocumentTypes = async (
        callback?: (types: TypeDocument[]) => void
        ): Promise<void> => {
        try {
            const response = await api.get<TypeDocumentResponse>("/document/document-type");
            const { data, success } = response.data;
            if (success && data) {
                callback?.(data);
            } else {
                console.warn("No se encontraron tipos de documento.");
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    return {
        getAllDocumentTypes
    };
   
};