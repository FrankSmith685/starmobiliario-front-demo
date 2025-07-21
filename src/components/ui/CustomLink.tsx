import { Link as MuiLink, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { FC, ReactNode, MouseEvent } from "react";
import type { VariantButton, VariantStyle } from "../../interfaces/DocumentComponent";

interface CustomLinkProps {
  to?: string;
  href?: string;
  text: string;
  icon?: ReactNode;
  variant?: VariantButton;
  fontSize?: string;
  fontWeight?: number | string;
  fontFamily?: string;
  underline?: "always" | "hover" | "none";
  target?: "_blank" | "_self";
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const CustomLink: FC<CustomLinkProps> = ({
  to,
  href,
  text,
  icon,
  variant = "primary",
  fontSize,
  fontWeight,
  fontFamily,
  underline = "hover",
  target = "_self",
  onClick,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const effectiveSize = isSmallScreen ? "md" : "lg";

  const linkColors: Record<string, VariantStyle> = {
    primary: { color: "#0A4C3D", hoverColor: "#116b56" },
    secondary: { color: "#C75C2D", hoverColor: "#D16938" },
    terciary: { color: "#2A3D66", hoverColor: "#344F7F" },
    warning: { color: "#C62828", hoverColor: "#D32F2F" },
  };

  const current = linkColors[variant] ?? linkColors.primary;

  const linkProps = {
    component: to ? RouterLink : "a",
    to,
    href,
    target,
    onClick,
  };

  return (
    <MuiLink
      {...linkProps}
      underline={underline}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        fontSize: fontSize || (effectiveSize === "lg" ? "1rem" : "0.9rem"),
        fontWeight: fontWeight ?? 500,
        fontFamily: fontFamily || "arial",
        color: current.color,
        transition: "color 0.2s",
        "&:hover": {
          color: current.hoverColor ?? current.color,
        },
        cursor: "pointer",
      }}
    >
      {icon}
      {text}
    </MuiLink>
  );
};
