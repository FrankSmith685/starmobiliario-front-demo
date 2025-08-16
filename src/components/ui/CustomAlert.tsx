import { Alert } from "@mui/material";
import type { FC, ReactNode } from "react";
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";

type CustomVariant = "primary" | "secondary" | "terciary" | "warning";

interface VariantStyle {
  border: string;
  focusBorder: string;
  background: string;
  color: string;
}

const colors: Record<CustomVariant, VariantStyle> = {
  primary:   { border: "#0A4C3D", focusBorder: "#116b56", background: "#F5FBF9", color: "#0A4C3D" },
  secondary: { border: "#C75C2D", focusBorder: "#D16938", background: "#FFF6F2", color: "#C75C2D" },
  terciary:  { border: "#2A3D66", focusBorder: "#344F7F", background: "#F4F6FB", color: "#2A3D66" },
  warning:   { border: "#C62828", focusBorder: "#D32F2F", background: "#FFF5F5", color: "#C62828" },
};

// Íconos por defecto según variante
const defaultIcons: Record<CustomVariant, ReactNode> = {
  primary: <FaCheckCircle size={20} />,
  secondary: <FaInfoCircle size={20} />,
  terciary: <FaInfoCircle size={20} />,
  warning: <FaExclamationCircle size={20} />,
};

interface CustomAlertProps {
  message: string;
  variant?: CustomVariant;
  show?: boolean;
  icon?: ReactNode; // puedes sobreescribir el ícono si quieres
}

const CustomAlert: FC<CustomAlertProps> = ({
  message,
  variant = "primary",
  show = true,
  icon,
}) => {
  if (!show) return null;

  const style = colors[variant];
  const chosenIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <Alert
      icon={icon === null ? false : chosenIcon}
      sx={{
        backgroundColor: style.background,
        color: style.color,
        borderLeft: `4px solid ${style.border}`,
        borderRadius: "6px",
        fontSize: "0.95rem",
        paddingY: 1,
        paddingX: 2,
        ".MuiAlert-icon": {
          color: style.color,
        },
      }}
    >
      {message}
    </Alert>
  );
};

export default CustomAlert;
