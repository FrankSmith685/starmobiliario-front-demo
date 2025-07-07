import { FormControlLabel, Switch, useMediaQuery } from "@mui/material";
import type { FC } from "react";
import type { CustomSwitchProps, Variant, VariantStyle } from "../../interfaces/DocumentComponent";


export const CustomSwitch: FC<CustomSwitchProps> = ({
  label,
  checked,
  onChange,
  variant = "primary",
  fontSize,
  fontFamily = "Arial",
  disabled = false,
  size,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const resolvedSize = size ? size : isSmallScreen ? "md" : "lg";

  const colors: Record<Variant, VariantStyle> = {
    primary: { border: "#0A4C3D", focusBorder: "#116b56", background: "#fff", color: "#0A4C3D" },
    secondary: { border: "#C75C2D", focusBorder: "#D16938", background: "#fff", color: "#C75C2D" },
    terciary: { border: "#2A3D66", focusBorder: "#344F7F", background: "#fff", color: "#2A3D66" },
    warning: { border: "#C62828", focusBorder: "#D32F2F", background: "#fff", color: "#C62828" }
  };

  const current = colors[variant];

  const resolvedFontSize = fontSize || (resolvedSize === "lg" ? "16px" : "15px");

  const switchScale = resolvedSize === "lg" ? 1 : 0.9;

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          sx={{
            transform: `scale(${switchScale})`,
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: current.focusBorder,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: current.focusBorder,
            },
          }}
        />
      }
      label={label}
      sx={{
        fontSize: resolvedFontSize,
        fontFamily,
        "& .MuiFormControlLabel-label": {
          fontSize: resolvedFontSize,
          fontFamily,
        },
      }}
    />
  );
};
