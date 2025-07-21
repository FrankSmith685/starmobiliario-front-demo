import type { FC } from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingOverlayProps {
  fullScreen?: boolean;
}

const CustomLoadingOverlay: FC<LoadingOverlayProps> = ({ fullScreen = false }) => {
  return (
    <div
      className={`z-50 flex items-center justify-center bg-white bg-opacity-70 ${
        fullScreen
          ? "fixed top-0 left-0 w-full h-full"
          : "absolute inset-0"
      }`}
    >
      <FaSpinner className="animate-spin text-primary text-3xl" />
    </div>
  );
};

export default CustomLoadingOverlay;
