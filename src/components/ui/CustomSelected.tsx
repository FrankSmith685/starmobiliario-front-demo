import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import type { FC } from "react";
import type { CustomSelectProps, Variant, VariantStyle } from "../../interfaces/DocumentComponent";

export const CustomSelect: FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  label = "Seleccione una opción",
  disabled = false,
  fullWidth = false,
  variant = "primary",
  size,
  fontSize,
  fontFamily,
  error = false,
  helperText = "",
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const resolvedSize = size ? size : isSmallScreen ? "md" : "lg";

  const colors: Record<Variant, VariantStyle> = {
    primary: { border: "#0A4C3D", focusBorder: "#116b56", background: "#fff", color: "#0A4C3D" },
    secondary: { border: "#C75C2D", focusBorder: "#D16938", background: "#fff", color: "#C75C2D" },
    terciary: { border: "#2A3D66", focusBorder: "#344F7F", background: "#fff", color: "#2A3D66" },
    warning: { border: "#C62828", focusBorder: "#D32F2F", background: "#fff", color: "#C62828" }
  };

  const neutral: VariantStyle = {
    border: "#ccc",
    focusBorder: "#999",
    background: "#fff",
    color: "#000",
    label: "#666"
  };

  const [focused, setFocused] = useState(false);
  const hasValue = value !== "" && value !== undefined;
  const current = focused || hasValue ? colors[variant] : neutral;

  const height = resolvedSize === "lg" ? 52 : 44;
  const internalFontSize = fontSize || resolvedSize === "lg" ? "16px" : "15px";

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      sx={{ minWidth: 200 }}
    >
      {hasValue && (
        <InputLabel
          sx={{
            fontSize: internalFontSize,
            color: current.label,
            '&.Mui-focused': {
            color: current.focusBorder,
            },
            '&.MuiInputLabel-shrink': {
            color: current.label,
            },
          }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        value={value}
        onChange={onChange}
        disabled={disabled}
        displayEmpty
        input={
          <OutlinedInput
            label={hasValue ? label : undefined}
            sx={{
              height: `${height}px !important`,
              padding: 0,
              '& .MuiSelect-select': {
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                fontSize: internalFontSize,
                fontFamily: fontFamily || "Arial",
                color: current.focusBorder,
              },
            }}
          />
        }
        renderValue={(selected) =>
          !hasValue ? (
            <span style={{ color: "#aaa" }}>Seleccione una opción</span>
          ) : (
            options.find((opt) => opt.value === selected)?.label
          )
        }
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              border: `1px solid ${current.border}`,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              "& .MuiMenuItem-root": {
                fontSize: internalFontSize,
                fontFamily: fontFamily || "Arial",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&.Mui-selected": {
                  backgroundColor: "#e0f2f1",
                  "&:hover": {
                    backgroundColor: "#d0ecea",
                  },
                },
              },
            },
          },
        }}
        sx={{
            height: `${height}px`,
            fontSize: internalFontSize,
            '& .MuiSelect-select': {
            minHeight: `${height}px`,
            lineHeight: `${height}px`,
            fontSize: internalFontSize,
            },

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: hasValue ? current.label : current.border,
            borderWidth: '1px !important',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: current.focusBorder,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: current.focusBorder,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText sx={{ backgroundColor: "#fff", px: 2, m: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
