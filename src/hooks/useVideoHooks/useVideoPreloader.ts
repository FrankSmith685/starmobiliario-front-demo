import { useEffect, useRef, useState } from "react";
import { videoList } from "../../utils/videoUtils";

interface VideoPreloaderState {
  videos: Record<string, string>;
  isLoaded: boolean;
}

export const useVideoPreloader = (): VideoPreloaderState => {
  const videos = useRef<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      const promises = videoList.map(({ name, key }) => {
        return new Promise<void>((resolve) => {
          if (videos.current[name]) {
            resolve();
            return;
          }

          const video = document.createElement("video");
          const relativeSrc = `/videos/${key}`;
          video.src = relativeSrc;

          // Carga solo metadata para no cargar todo el archivo de una
          video.onloadedmetadata = () => {
            videos.current[name] = relativeSrc;
            resolve();
          };

          video.onerror = () => {
            console.error(`Error al cargar el video: ${video.src}`);
            resolve();
          };
        });
      });

      await Promise.all(promises);
      if (isMounted) setIsLoaded(true);
    };

    loadVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { videos: videos.current, isLoaded };
};
