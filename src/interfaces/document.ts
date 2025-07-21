export interface TypeDocument {
  cod_tipo_documento: number;
  nombre: string;
}

export interface TypeDocumentResponse {
  success: boolean;
  message: string;
  data: TypeDocument[];
}