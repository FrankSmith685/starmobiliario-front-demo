import type { ModeLoginType } from "../../interfaces/appStateInterface";
import type { AuthLoginForm, AuthRegisterForm } from "../../interfaces/auth";
import type { Aviso, AvisosDTO } from "../../interfaces/avisos";
import type { NewInmueble, ProgressPrincipalProperty, ProgressProperty } from "../../interfaces/inmueble";
import type { UsuarioData } from "../../interfaces/user";
import { SET_ACCESSTOKEN, SET_AUTHLOGINFORM, SET_AUTHREGISTERFORM, SET_FILTRO_AVISOS, SET_IS_ARCHIVADO, SET_LISTA_AVISOS, SET_LOADING_USER, SET_MENU_OPEN, SET_MODAL, SET_MODE, SET_MODELOGIN, SET_NEW_INMUEBLE, SET_PROGRESS_PRINCIPAL_PROPERTY, SET_PROGRESS_PROPERTY, SET_REFRESHTOKEN, SET_REGISTERUSER, SET_SELECCIONADOS_AVISOS, SET_USER } from "../../types/actionTypes";

export const setRegisterUser = (registerUser: string | null) => ({
  type: SET_REGISTERUSER,
  payload: registerUser,
});

export const setMode = (mode: string | null) => ({
  type: SET_MODE,
  payload: mode,
});

export const setModal = (modal: boolean) => ({
  type: SET_MODAL,
  payload: modal,
});

export const setModeLogin = (modeLogin: ModeLoginType) => ({
  type: SET_MODELOGIN,
  payload: modeLogin,
});

export const setAuthLoginForm = (authLoginForm: AuthLoginForm) => ({
  type: SET_AUTHLOGINFORM,
  payload: authLoginForm,
});


export const setAuthRegisterForm = (authRegisterForm: AuthRegisterForm) => ({
  type: SET_AUTHREGISTERFORM,
  payload: authRegisterForm,
});

export const setAccessToken = (accessToken: string | null) => ({
  type: SET_ACCESSTOKEN,
  payload: accessToken,
});

export const setRefreshtoken = (refreshToken: string | null) => ({
  type: SET_REFRESHTOKEN,
  payload: refreshToken,
});

export const setUser = (user: UsuarioData | null) => ({
  type: SET_USER,
  payload: user,
});


export const setLoadingUser = (loadingUser: boolean) => ({
  type: SET_LOADING_USER,
  payload: loadingUser,
});

export const setMenuOpen = (menuOpen: boolean) => ({
  type: SET_MENU_OPEN,
  payload: menuOpen,
});

export const setProgressProperty = (progressProperty: ProgressProperty) => ({
  type: SET_PROGRESS_PROPERTY,
  payload: progressProperty,
});

export const setNewInmueble = (newInmueble: NewInmueble) => ({
  type: SET_NEW_INMUEBLE,
  payload: newInmueble,
});

export const setProgressPrincipalProperty = (progressPrincipalProperty: ProgressPrincipalProperty) => ({
  type: SET_PROGRESS_PRINCIPAL_PROPERTY,
  payload: progressPrincipalProperty,
});

export const setListaAvisos = (listaAvisos: AvisosDTO) => ({
  type: SET_LISTA_AVISOS,
  payload: listaAvisos,
});

export const setFiltroAvisos = (filtroAvisos: Aviso[]) => ({
  type: SET_FILTRO_AVISOS,
  payload: filtroAvisos,
});

export const setIsArchivado = (isArchivado: boolean) => ({
  type: SET_IS_ARCHIVADO,
  payload: isArchivado,
});

export const setSeleccionadosAvisos = (seleccionadosAvisos: Aviso[]) => ({
  type: SET_SELECCIONADOS_AVISOS,
  payload: seleccionadosAvisos,
});

