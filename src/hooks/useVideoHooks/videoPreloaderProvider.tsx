/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from "react";
import { useVideoPreloader } from "./useVideoPreloader";

interface VideoPreloaderContextType {
  videos: Record<string, string>;
  isLoaded: boolean;
}
export const VideoPreloaderContext = createContext<VideoPreloaderContextType | null>(null);

export const VideoPreloaderProvider = ({ children }: { children: ReactNode }) => {
  const { videos, isLoaded } = useVideoPreloader();

  return (
    <VideoPreloaderContext.Provider value={{ videos, isLoaded }}>
      {children}
    </VideoPreloaderContext.Provider>
  );
};
