import { Alert, type AlertColor,  } from "@mui/material";
import type { FC } from "react";

interface CustomAlertProps {
  message: string;
  type?: AlertColor; // "success" | "info" | "warning" | "error"
  show?: boolean;
}

const CustomAlert: FC<CustomAlertProps> = ({ message, type = "info", show = true }) => {
  if (!show) return null;

  return (
    <Alert severity={type} variant="filled">
      {message}
    </Alert>
  );
};

export default CustomAlert;
