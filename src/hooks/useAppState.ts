import { useContext } from "react";
import { AppContext } from "../context/appContext";

import { 
  setRegisterUser,
} from "../context/actions/actions";

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState debe ser usado dentro de un AppProvider");
  }

  const { appState, dispatch } = context;

  return {
    ...appState,
    setRegisterUser: (registerUser: string | null) => dispatch(setRegisterUser(registerUser)),
  };
};
