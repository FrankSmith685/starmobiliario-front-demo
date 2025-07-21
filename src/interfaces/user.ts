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
}

export interface UsuarioResponse {
  success:boolean,
  message: string,
  data:UsuarioData
}