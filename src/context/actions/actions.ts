import type { ModeLoginType } from "../../interfaces/appStateInterface";
import type { AuthLoginForm, AuthRegisterForm } from "../../interfaces/auth";
import type { ProgressProperty } from "../../interfaces/inmueble";
import type { UsuarioData } from "../../interfaces/user";
import { SET_ACCESSTOKEN, SET_AUTHLOGINFORM, SET_AUTHREGISTERFORM, SET_LOADING_USER, SET_MENU_OPEN, SET_MODAL, SET_MODE, SET_MODELOGIN, SET_PROGRESS_PROPERTY, SET_REFRESHTOKEN, SET_REGISTERUSER, SET_USER } from "../../types/actionTypes";

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





