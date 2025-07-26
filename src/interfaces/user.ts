export interface TypeUser {
  cod_tipo_usuario: number;
  descripcion: string;
}

export interface TypeUserResponse {
  success: boolean;
  message: string;
  data: TypeUser[];
}

export interface UsuarioData {
  cod_usuario: string;
  correo: string;
  nombre?: string;
  apellido?: string;
  razon_social?: string;
  telefono?: string;
  telefono_movil?: string;
  tipo_usuario?: TypeUser;
  documento?: {
    nro_documento: string;
    tipo_documento: string;
  };
  tipo_registro?: TipoRegistro;
}

export interface UsuarioResponse {
  success:boolean,
  message: string,
  data:UsuarioData
}
export type TipoRegistro = 'Completo' | 'Parcial' | 'Google' | 'Facebook';

export interface UpdateUsuarioCompleto {
  cod_usuario?: string;
  nombre?: string;
  apellido?: string;
  razon_social?: string;
  telefono?: string;
  telefono_movil?: string;
  cod_tipo_usuario?: number;
  documento?: {
    cod_tipo_documento?: number;
    nro_documento?: string;
  };
  tipo_registro?:TipoRegistro;
}

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};

export interface ChangeEmailRequest {
  currentEmail: string;
  newEmail: string;
}

export interface ChangeEmailResponse {
  success: boolean;
  message: string;
}