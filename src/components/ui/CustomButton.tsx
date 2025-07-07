import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import type { FC } from "react";
import type { CustomButtonProps, VariantButton, VariantStyle } from "../../interfaces/DocumentComponent";

export const CustomButton: FC<CustomButtonProps> = ({
  text,
  onClick,
  size,
  variant= "primary" as VariantButton,
  icon,
  uppercase = false,
  fullWidth = false,
  disabled = false,
  loading = false,
  type = "button",
  ariaLabel,
  fontSize,
  fontFamily,
  fontWeight,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const effectiveSize = isSmallScreen ? "md" : size || "lg";

  const baseColors: Record<string, VariantStyle> = {
    primary: { bg: "#0A4C3D", color: "#fff", hoverBg: "#116b56", border: "none" },
    secondary: { bg: "#C75C2D", color: "#fff", hoverBg: "#D16938", border: "none" },
    terciary: { bg: "#2A3D66", color: "#fff", hoverBg: "#344F7F", border: "none" },
    warning: { bg: "#C62828", color: "#fff", hoverBg: "#D32F2F", border: "none" },
    "primary-outline": { bg: "#fff", color: "#0A4C3D", hoverBg: "#f0fdfa", border: "1px solid #0A4C3D", hoverColor: "#0A4C3D" },
    "secondary-outline": { bg: "#fff", color: "#C75C2D", hoverBg: "#fff7f2", border: "1px solid #C75C2D", hoverColor: "#C75C2D" },
    "terciary-outline": { bg: "#fff", color: "#2A3D66", hoverBg: "#f4f6fb", border: "1px solid #2A3D66", hoverColor: "#2A3D66" },
    "warning-outline": { bg: "#fff", color: "#C62828", hoverBg: "#fdf2f2", border: "1px solid #C62828", hoverColor: "#C62828" }
  };

  const current = baseColors[variant];
  const isOutline = variant.includes("outline");
  const height = effectiveSize === "lg" ? 52 : 44;

  return (
    <Button
      variant={isOutline ? "outlined" : "contained"}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      sx={{
        textTransform: uppercase ? "uppercase" : "none",
        fontWeight: fontWeight ?? 600,
        fontSize: fontSize || (effectiveSize === "lg" ? "1.2rem" : "1rem"),
        fontFamily: fontFamily || "arial",
        height,
        backgroundColor: current.bg,
        color: current.color,
        border: current.border,
        borderRadius: "5px",
        transition: "all 0.3s",
        "&:hover": {
          backgroundColor: current.hoverBg,
          color: current.hoverColor ?? current.color,
        },
      }}
      startIcon={loading ? <CircularProgress size={18} color="inherit" /> : icon}
    >
      {loading ? "Cargando..." : text}
    </Button>
  );
};
