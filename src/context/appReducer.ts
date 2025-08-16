import type { AppState } from "../interfaces/appStateInterface";
import { SET_ACCESSTOKEN, SET_AUTHLOGINFORM, SET_AUTHREGISTERFORM, SET_FILTRO_AVISOS, SET_IS_ARCHIVADO, SET_LISTA_AVISOS, SET_LOADING_USER, SET_LOGOUT, SET_MENU_OPEN, SET_MODAL, SET_MODE, SET_MODELOGIN, SET_NEW_INMUEBLE, SET_PROGRESS_PRINCIPAL_PROPERTY, SET_PROGRESS_PROPERTY, SET_REFRESHTOKEN, SET_REGISTERUSER, SET_SELECCIONADOS_AVISOS, SET_USER, type ActionTypes } from "../types/actionTypes";

export const appReducer = (state: AppState, action: ActionTypes): AppState => {
  switch (action.type) {
    case SET_REGISTERUSER:
      return { ...state, registerUser: action.payload };
    case SET_MODE:
      return { ...state, mode: action.payload };
    case SET_MODAL:
      return { ...state, modal: action.payload };
    case SET_MODELOGIN:
      return { ...state, modeLogin: action.payload };
    case SET_AUTHLOGINFORM:
      return { ...state, authLoginForm: action.payload };
    case SET_AUTHREGISTERFORM:
      return { ...state, authRegisterForm: action.payload };
    case SET_ACCESSTOKEN:
      if (action.payload !== null) {
        localStorage.setItem('accessToken', action.payload);
      } else {
        localStorage.removeItem('accessToken');
      }
      return { ...state, accessToken: action.payload };
    case SET_REFRESHTOKEN:
      if (action.payload !== null) {
        localStorage.setItem('refreshToken', action.payload);
      } else {
        localStorage.removeItem('refreshToken');
      }
      return { ...state, refreshToken: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
      ...state,
      accessToken: null,
      refreshToken: null,
      user: null,
      modal: true,
      modeLogin: "login_one",
      mode: 'login',
      authLoginForm: {
        correo: '',
        contraseña: '',
      },
      authRegisterForm: {
        tipoUsuario: 0,
        correo: '',
        contraseña: '',
        nombre: '',
        apellido: '',
        razon_social: null,
        tipoDocumento: 0,
        nroDocumento: '',
        telefono: '',
        telefono_movil: '',
      }
    }
    case SET_LOADING_USER:
      return { ...state, loadingUser: action.payload };
    case SET_MENU_OPEN:
      return { ...state, menuOpen: action.payload };
    case SET_PROGRESS_PROPERTY:
      return { ...state, progressProperty: action.payload };
    case SET_NEW_INMUEBLE:
      return { ...state, newInmueble: action.payload };
    case SET_PROGRESS_PRINCIPAL_PROPERTY:
      return { ...state, progressPrincipalProperty: action.payload };
    case SET_LISTA_AVISOS:
      return { ...state, listaAvisos: action.payload };
    case SET_FILTRO_AVISOS:
      return { ...state, filtroAvisos: action.payload };
    case SET_IS_ARCHIVADO:
      return { ...state, isArchivado: action.payload };
    case SET_SELECCIONADOS_AVISOS:
      return { ...state, seleccionadosAvisos: action.payload };
    default:
      return state;
  }
};
