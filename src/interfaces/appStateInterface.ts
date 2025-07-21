import type { AuthLoginForm, AuthRegisterForm } from "./auth";
import type { UsuarioData } from "./user";

export type ModeLoginType = "login_one" | "login_two" | "login_three" | "recover_one" | "recover_two" | "recover_three";

export interface AppState {
  registerUser: string | null;
  mode: string | null;
  modal: boolean;
  modeLogin: ModeLoginType;
  authLoginForm: AuthLoginForm;
  authRegisterForm: AuthRegisterForm;
  accessToken: string | null;
  refreshToken: string | null;
  user: UsuarioData | null;
  loadingUser: boolean;
  menuOpen: boolean;
}
