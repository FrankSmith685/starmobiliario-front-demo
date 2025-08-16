import type { ModeLoginType } from "../interfaces/appStateInterface";
import type { AuthLoginForm, AuthRegisterForm } from "../interfaces/auth";
import type { Aviso, AvisosDTO } from "../interfaces/avisos";
import type { NewInmueble, ProgressProperty, ProgressPrincipalProperty } from "../interfaces/inmueble";
import type { UsuarioData } from "../interfaces/user";

export const SET_REGISTERUSER = "SET_REGISTERUSER" as const;
export const SET_MODE = "SET_MODE" as const;
export const SET_MODAL = "SET_MODAL" as const;
export const SET_MODELOGIN = "SET_MODELOGIN" as const;
export const SET_AUTHLOGINFORM = "SET_AUTHLOGINFORM" as const;
export const SET_AUTHREGISTERFORM = "SET_AUTHREGISTERFORM" as const;
export const SET_ACCESSTOKEN = "SET_ACCESSTOKEN" as const;
export const SET_REFRESHTOKEN = "SET_REFRESHTOKEN" as const;
export const SET_USER = "SET_USER" as const;
export const SET_LOGOUT = "SET_LOGOUT" as const;
export const SET_LOADING_USER = "SET_LOADING_USER" as const;
export const SET_MENU_OPEN = "SET_MENU_OPEN" as const;
export const SET_PROGRESS_PROPERTY = "SET_PROGRESS_PROPERTY" as const;
export const SET_NEW_INMUEBLE = "SET_NEW_INMUEBLE" as const;
export const SET_PROGRESS_PRINCIPAL_PROPERTY = "SET_PROGRESS_PRINCIPAL_PROPERTY" as const;
export const SET_LISTA_AVISOS = "SET_LISTA_AVISOS" as const;
export const SET_FILTRO_AVISOS = "SET_FILTRO_AVISOS" as const;
export const SET_IS_ARCHIVADO = "SET_IS_ARCHIVADO" as const;
export const SET_SELECCIONADOS_AVISOS = "SET_SELECCIONADOS_AVISOS" as const;


export type ActionTypes =
  | { type: typeof SET_REGISTERUSER; payload: string | null }
  | { type: typeof SET_MODE; payload: string | null }
  | { type: typeof SET_MODAL; payload: boolean }
  | { type: typeof SET_MODELOGIN; payload: ModeLoginType }
  | { type: typeof SET_AUTHLOGINFORM; payload: AuthLoginForm }
  | { type: typeof SET_AUTHREGISTERFORM; payload: AuthRegisterForm }
  | { type: typeof SET_ACCESSTOKEN; payload: string | null }
  | { type: typeof SET_REFRESHTOKEN; payload: string | null }
  | { type: typeof SET_USER; payload: UsuarioData | null }
  | { type: typeof SET_LOGOUT}
  | { type: typeof SET_LOADING_USER; payload: boolean }
  | { type: typeof SET_MENU_OPEN; payload: boolean }
  | { type: typeof SET_PROGRESS_PROPERTY; payload: ProgressProperty }
  | { type: typeof SET_NEW_INMUEBLE; payload: NewInmueble }
  | { type: typeof SET_PROGRESS_PRINCIPAL_PROPERTY; payload: ProgressPrincipalProperty }
  | { type: typeof SET_LISTA_AVISOS; payload: AvisosDTO }
  | { type: typeof SET_FILTRO_AVISOS; payload: Aviso[] }
  | { type: typeof SET_IS_ARCHIVADO; payload: boolean }
   | { type: typeof SET_SELECCIONADOS_AVISOS; payload: Aviso[] }
  


   