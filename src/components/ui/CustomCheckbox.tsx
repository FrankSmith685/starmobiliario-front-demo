import { FormControlLabel, Checkbox, useMediaQuery } from "@mui/material";
import type { FC } from "react";
import type { CustomCheckboxProps, Variant, VariantStyle } from "../../interfaces/DocumentComponent";

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
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
  const resolvedSize = size || (isSmallScreen ? "md" : "lg");
  const resolvedFontSize = fontSize || (resolvedSize === "lg" ? "16px" : "15px");

  const colors: Record<Variant, VariantStyle> = {
    primary: { border: "#0A4C3D", focusBorder: "#116b56", background: "#fff", color: "#0A4C3D" },
    secondary: { border: "#C75C2D", focusBorder: "#D16938", background: "#fff", color: "#C75C2D" },
    terciary: { border: "#2A3D66", focusBorder: "#344F7F", background: "#fff", color: "#2A3D66" },
    warning: { border: "#C62828", focusBorder: "#D32F2F", background: "#fff", color: "#C62828" }
  };

  const current = colors[variant];

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          sx={{
            transform: resolvedSize === "lg" ? "scale(1)" : "scale(0.9)",
            color: current.border,
            "&.Mui-checked": {
              color: current.focusBorder,
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
