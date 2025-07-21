export interface AuthRegisterForm {
  tipoUsuario: number;
  correo: string;
  contraseña: string;
  nombre: string;
  apellido: string;
  razon_social: string | null;
  tipoDocumento: number;
  nroDocumento: string;
  telefono: string;
  telefono_movil: string;
}

export interface AuthLoginForm {
  correo: string;
  contraseña: string;
  token?: string;
}

export interface RegisterAuthResponse{
  success:boolean,
  accessToken?: string,
  refreshToken?: string,
  message?: string
}
