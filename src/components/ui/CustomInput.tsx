import { useState } from "react";
import { TextField, InputAdornment, IconButton, useMediaQuery } from "@mui/material";
import { Search, Visibility, VisibilityOff } from "@mui/icons-material";
import type { ChangeEvent, FC } from "react";
import type { CustomInputProps, Variant, VariantStyle } from "../../interfaces/DocumentComponent";

export const CustomInput: FC<CustomInputProps> = ({
  name,
  inputRef,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  fullWidth = false,
  variant = "primary",
  size = "lg",
  ariaLabel,
  fontSize,
  fontFamily,
  icon,
  label,
  required,
  error = false,
  helperText = "",
  multiline = false,
  rows,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const responsiveSize = isSmallScreen ? "md" : size || "lg";

  const colors: Record<Variant, VariantStyle> = {
    primary: { border: "#0A4C3D", focusBorder: "#116b56", background: "#fff", color: "#0A4C3D" },
    secondary: { border: "#C75C2D", focusBorder: "#D16938", background: "#fff", color: "#C75C2D" },
    terciary: { border: "#2A3D66", focusBorder: "#344F7F", background: "#fff", color: "#2A3D66" },
    warning: { border: "#C62828", focusBorder: "#D32F2F", background: "#fff", color: "#C62828" }
    
  };

  const neutral: VariantStyle = { border: "#ccc", focusBorder: "#999", background: "#fff", color: "#000", label: "#666" };
  const isPassword = type === 'password';
  const isSearch = type === 'search';
  const isNumber = type === 'number';
  const height = responsiveSize === "lg" ? 52 : 44;
  const hasStartAdornment = isSearch || icon;

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const current = focused ? colors[variant] : neutral;

  const handleTogglePassword = () => setShowPassword(prev => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    if (isNumber) {
      const val = e.target.value;
      if (/^\d*$/.test(val)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <TextField
      name={name}
      inputRef={inputRef}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      type={
        isPassword
          ? (showPassword ? 'text' : 'password')
          : (isNumber ? 'text' : type)
      }
      disabled={disabled}
      fullWidth={fullWidth}
      aria-label={ariaLabel}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
      FormHelperTextProps={{
        sx: {
          backgroundColor: '#fff',
          paddingLeft: 2,
          paddingRight: 2,
          m: 0,
        }
      }}
      InputLabelProps={{
        sx: {
          top: responsiveSize === 'md' ? '-6px' : '0px',
          color: current.label,
          '&.Mui-focused': {
            color: current.focusBorder
          }
        }
      }}
      InputProps={{
        ...(hasStartAdornment && {
          startAdornment: (
            <InputAdornment position="start">
              {isSearch && <Search sx={{ color: '#1F2937' }} />}
              {icon}
            </InputAdornment>
          )
        }),
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword}>
              {showPassword ? (
                <VisibilityOff className="text-gray-600 !text-2xl" />
              ) : (
                <Visibility className="text-gray-600 !text-2xl" />
              )}

            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={{
        backgroundColor: current.background,
        width: fullWidth ? '100%' : 'auto',
        '& .MuiOutlinedInput-root': {
          minHeight: height,
          '& fieldset': {
            borderColor: current.border,
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: current.focusBorder,
            borderWidth: '1px',
          },
          '&.Mui-focused fieldset': {
            borderColor: current.focusBorder,
            borderWidth: '1px',
          },
        },
        '& input': {
          fontSize: fontSize || (responsiveSize === "lg" ? "15px" : "15px"),
          fontFamily: fontFamily || "Arial",
          padding: hasStartAdornment ? '0px' : (responsiveSize === "lg" ? "10px 14px" : "8px 12px"),
          paddingLeft: hasStartAdornment ? '0px' : (responsiveSize === "lg" ? "14px" : "14px"),
          paddingRight: isPassword ? (responsiveSize === "lg" ? "48px" : "40px") : (responsiveSize === "lg" ? "14px" : "12px"),
        },
      }}
      label={label ? `${label}` : undefined}
      required={required}
    />
  );
};
