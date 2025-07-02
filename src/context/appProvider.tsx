import { useReducer, type ReactNode } from "react";
import { AppContext } from "./appContext";
import { appReducer } from "./appReducer";
import type { AppState } from "../interfaces/appStateInterface";
import { ImagePreloaderProvider } from "../hooks/useImageHooks/imagePreloaderProvider";
// import { VideoPreloaderProvider } from "../hooks/useVideoHooks/videoPreloaderProvider";

interface Props {
  children: ReactNode;
}

const initialState: AppState = {
  registerUser: null,
};

export const AppProvider = ({ children }: Props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      <ImagePreloaderProvider>
        {/* <VideoPreloaderProvider> */}
          {children}
        {/* </VideoPreloaderProvider> */}
        </ImagePreloaderProvider>
    </AppContext.Provider>
  );
};
