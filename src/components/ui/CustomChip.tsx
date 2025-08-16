import { Chip } from "@mui/material";
import type { FC } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export interface CustomChipProps {
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  variant?: "primary" | "secondary" | "terciary" | "warning" |
            "primary-outline" | "secondary-outline" | "terciary-outline" | "warning-outline";
  size?: "small" | "medium";
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  clickable?: boolean;
  selected?: boolean;
}

const baseColors: Record<string, {
  bg: string;
  color: string;
  hoverBg: string;
  border: string;
  hoverColor?: string;
}> = {
  primary:            { bg: "#0A4C3D", color: "#fff", hoverBg: "#116b56", border: "none" },
  secondary:          { bg: "#C75C2D", color: "#fff", hoverBg: "#D16938", border: "none" },
  terciary:           { bg: "#2A3D66", color: "#fff", hoverBg: "#344F7F", border: "none" },
  warning:            { bg: "#C62828", color: "#fff", hoverBg: "#D32F2F", border: "none" },
  "primary-outline":   { bg: "#fff", color: "#0A4C3D", hoverBg: "#f0fdfa", border: "1px solid #0A4C3D", hoverColor: "#0A4C3D" },
  "secondary-outline": { bg: "#fff", color: "#C75C2D", hoverBg: "#fff7f2", border: "1px solid #C75C2D", hoverColor: "#C75C2D" },
  "terciary-outline":  { bg: "#fff", color: "#2A3D66", hoverBg: "#f4f6fb", border: "1px solid #2A3D66", hoverColor: "#2A3D66" },
  "warning-outline":   { bg: "#fff", color: "#C62828", hoverBg: "#fdf2f2", border: "1px solid #C62828", hoverColor: "#C62828" }
};

export const CustomChip: FC<CustomChipProps> = ({
  label,
  onClick,
  onDelete,
  variant = "primary",
  size = "medium",
  selected = false,
  clickable = true
}) => {
  const current = baseColors[variant];

  return (
    <Chip
      label={label}
      onClick={clickable ? onClick : undefined}
      onDelete={onDelete}
    icon={selected ? <FaCheckCircle size={18} /> : undefined}
      deleteIcon={onDelete ? <FaTimes size={18} /> : undefined}
      size={size}
      clickable={clickable}
      sx={{
        backgroundColor: current.bg,
        color: current.color,
        border: current.border,
        fontWeight: 500,
        fontFamily: "Arial",
        transition: "all 0.3s ease",
        boxShadow: isOutline(variant) ? "none" : "0px 2px 6px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: current.hoverBg,
          color: current.hoverColor ?? current.color,
          transform: "scale(1.05)",
          boxShadow: isOutline(variant)
            ? "0px 0px 8px rgba(0, 0, 0, 0.05)"
            : "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
        "& .MuiChip-icon": {
          color: current.color,
        },
        "& .MuiChip-deleteIcon": {
          color: current.color,
          "&:hover": {
            color: current.hoverColor ?? current.color,
          }
        }
      }}
    />
  );
};

function isOutline(variant: string) {
  return variant.includes("outline");
}
