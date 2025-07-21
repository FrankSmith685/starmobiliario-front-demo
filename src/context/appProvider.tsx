import { useReducer, type ReactNode } from "react";
import { AppContext } from "./appContext";
import { appReducer } from "./appReducer";
import type { AppState } from "../interfaces/appStateInterface";
import { ImagePreloaderProvider } from "../hooks/useImageHooks/imagePreloaderProvider";
import { NotificationProvider } from "../hooks/useNotificacionHooks/notificacionProvider";
import { SET_LOGOUT } from "../types/actionTypes";
import { setLogoutFunction } from "../helpers/logoutHelper";
// import { VideoPreloaderProvider } from "../hooks/useVideoHooks/videoPreloaderProvider";

interface Props {
  children: ReactNode;
}

const initialState: AppState = {
  
  registerUser: null,
  mode: null,
  modal: false,
  modeLogin: 'login_one',
  authLoginForm:{
    correo: '',
    contraseña: '',
  },
  authRegisterForm:{
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
  },
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: null,
  loadingUser: false,
  menuOpen:false,
};




export const AppProvider = ({ children }: Props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const logout = () => {
    dispatch({ type: SET_LOGOUT });
  };

  setLogoutFunction(logout);

  return (
    <AppContext.Provider value={{ appState, dispatch, logout }}>
      <NotificationProvider>
      <ImagePreloaderProvider>
        {/* <VideoPreloaderProvider> */}
          {children}
        {/* </VideoPreloaderProvider> */}
        </ImagePreloaderProvider>
         </NotificationProvider>
    </AppContext.Provider>
  );
};
