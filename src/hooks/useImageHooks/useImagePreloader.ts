import { useEffect, useRef, useState } from "react";
import { imageList } from "../../utils/imageUtils";
// import { imageList } from "@/utils/imageUtils";

interface ImagePreloaderState {
  images: Record<string, string>;
  isLoaded: boolean;
}

export const useImagePreloader = (): ImagePreloaderState => {
  const images = useRef<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      const promises = imageList.map(({ name, key }) => {
        return new Promise<void>((resolve) => {
          if (images.current[name]) {
            resolve();
            return;
          }

          const img = new Image();
          const relativeSrc = `/images/${key}`; // ✅ RUTA RELATIVA
          img.src = relativeSrc;

          img.onload = () => {
            images.current[name] = relativeSrc; // ✅ GUARDAR RUTA RELATIVA
            resolve();
          };

          img.onerror = () => {
            console.error(`Error al cargar la imagen: ${img.src}`);
            resolve();
          };
        });
      });

      await Promise.all(promises);
      if (isMounted) setIsLoaded(true);
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return { images: images.current, isLoaded };
};
