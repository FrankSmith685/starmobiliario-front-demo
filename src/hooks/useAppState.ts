import { useContext } from "react";
import { AppContext } from "../context/appContext";

import { 
  setMode,
  setRegisterUser,
  setModal,
  setModeLogin,
  setAuthLoginForm,
  setAuthRegisterForm,
  setAccessToken,
  setRefreshtoken,
  setUser,
  setLoadingUser,
  setMenuOpen
} from "../context/actions/actions";
import type { ModeLoginType } from "../interfaces/appStateInterface";
import type { AuthLoginForm, AuthRegisterForm } from "../interfaces/auth";
import type { UsuarioData } from "../interfaces/user";

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState debe ser usado dentro de un AppProvider");
  }

  const { appState, dispatch } = context;

  return {
    ...appState,
    setRegisterUser: (registerUser: string | null) => dispatch(setRegisterUser(registerUser)),
    setMode: (mode: string | null) => dispatch(setMode(mode)),
    setModal: (modal: boolean) => dispatch(setModal(modal)),
    setModeLogin: (modeLogin: ModeLoginType) => dispatch(setModeLogin(modeLogin)),
    setAuthLoginForm: (authLoginForm: AuthLoginForm) => dispatch(setAuthLoginForm(authLoginForm)),
    setAuthRegisterForm: (authRegisterForm: AuthRegisterForm) => dispatch(setAuthRegisterForm(authRegisterForm)),
    setAccessToken: (accessToken: string | null) => dispatch(setAccessToken(accessToken)),
    setRefreshtoken: (refreshToken: string | null) => dispatch(setRefreshtoken(refreshToken)),
    setUser: (user: UsuarioData | null) => dispatch(setUser(user)),
    setLoadingUser: (loadingUser: boolean) => dispatch(setLoadingUser(loadingUser)),
    setMenuOpen: (menuOpen: boolean) => dispatch(setMenuOpen(menuOpen)),

  };
};
