// components/ui/CustomNotificaciones.tsx
import { useNotification } from "../../hooks/useNotificacionHooks/useNotification";
import { Snackbar, Alert } from "@mui/material";

export const CustomNotificaciones = () => {
  const { apiMessage, messageType, clearMessage } = useNotification();

  // Si no hay mensaje o tipo, no renderiza nada
  if (!apiMessage || !messageType) return null;

  return (
    <Snackbar
      open={true}
      autoHideDuration={4000}
      onClose={clearMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={clearMessage}
        severity={messageType}
        variant="filled"
        sx={{
          width: "100%",
          maxWidth: 400,
          mx: "auto",
        }}
      >
        {apiMessage}
      </Alert>
    </Snackbar>
  );
};
