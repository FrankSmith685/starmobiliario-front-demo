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
  progressProperty: {
    step: 1,
    totalSteps: 4,
    currentPath: "/panel/publicador/principales",
  },
  newInmueble:{
    cod_inmueble:"",
    cod_usuario:"",
    titulo:null,
    descripcion:null,
    cod_tipo_inmueble:0,
    cod_subtipo_inmueble:0,
    cod_ubigeo:null,
    cod_estado_inmueble:0,
    operaciones:[],
    caracteristicas:null,
    generales:null,
    amoblamientos:null,
    multimedias:null,
    precios:null
  },
  progressPrincipalProperty:{
    step: 1,
    totalSteps: 3,
    currentPath: "/panel/publicador/principales/operacionypropiedad",
  },
  listaAvisos:{
    avisos:[],
    avisos_duplicados:0,
    avisos_incompletos:0,
    consultas_pendientes:0,
    planes_activos:[],
    productos_disponibles:0,
    reportes_pendientes:0,
  },
  filtroAvisos:[],
  isArchivado:false,
  seleccionadosAvisos:[]
}

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
