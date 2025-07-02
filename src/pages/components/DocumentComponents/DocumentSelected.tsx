import { useState, type ElementType, type FC } from "react";
import {
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { CustomSelect } from "../../../components/ui/CustomSelected";
import { CustomInput } from "../../../components/ui/CustomInput";
import type { PropItem, Variant } from "../../../interfaces/DocumentComponent";
import { CustomSwitch } from "../../../components/ui/CustomSwitch";

interface DocumentSelectProps {
  ComponentDoc: ElementType;
}

const DocumentSelect: FC<DocumentSelectProps> = ({ ComponentDoc }) => {
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<"md" | "lg">("md");
  const [fullWidth, setFullWidth] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [fontSize, setFontSize] = useState("1rem");
  const [fontFamily, setFontFamily] = useState("Arial");

  const options = [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
  ];

   const props: PropItem[] = [
    { name: "value", description: "Valor del select", type: "string", required: true, example: JSON.stringify(value), values: [value], defaultValue: '""', notes: "Valor controlado del select." },
    { name: "onChange", description: "Función al cambiar el valor", type: "(e) => void", required: true, example: 'onChange={(e) => setValue(e.target.value)}', values: ["Función"], defaultValue: "-", notes: "Callback de cambio de valor." },
    { name: "placeholder", description: "Texto de marcador de posición", type: "string", required: false, example: '"Seleccione una opción"', values: ["Texto"], defaultValue: '""', notes: "Texto mostrado cuando no hay selección." },
    { name: "variant", description: "Variante de color", type: '"primary" | "secondary" | "terciary" | "warning"', required: false, example: JSON.stringify(variant), values: ["primary", "secondary", "terciary", "warning"], defaultValue: '"primary"', notes: "Estilo de color del select." },
    { name: "size", description: "Tamaño del select", type: '"md" | "lg"', required: false, example: JSON.stringify(size), values: ["md", "lg"], defaultValue: '"lg"', notes: "Tamaño del componente." },
    { name: "fullWidth", description: "Ancho completo", type: "boolean", required: false, example: JSON.stringify(fullWidth), values: ["true", "false"], defaultValue: "false", notes: "Si ocupa el ancho total." },
    { name: "disabled", description: "Deshabilita el select", type: "boolean", required: false, example: JSON.stringify(disabled), values: ["true", "false"], defaultValue: "false", notes: "Si el select está deshabilitado." },
    { name: "fontSize", description: "Tamaño de fuente", type: "string", required: false, example: JSON.stringify(fontSize), values: ["Cualquier tamaño válido"], defaultValue: '"1rem"', notes: "Tamaño de la fuente del select." },
    { name: "fontFamily", description: "Tipo de fuente", type: "string", required: false, example: JSON.stringify(fontFamily), values: ["Cualquier fuente"], defaultValue: '"Arial"', notes: "Fuente del texto." },
    { name: "error", description: "Indica error", type: "boolean", required: false, example: JSON.stringify(error), values: ["true", "false"], defaultValue: "false", notes: "Estilo de error." },
    { name: "helperText", description: "Texto de ayuda o error", type: "string", required: false, example: JSON.stringify(helperText), values: ["Texto"], defaultValue: '""', notes: "Texto de ayuda debajo del select." },
  ];

  return (
    <ComponentDoc name="Select Personalizado" description="Un campo de selección reutilizable con props dinámicos." props={props}>      
      <Stack direction="column" spacing={2}>

        <CustomSelect
            value={variant}
            onChange={(e) => setVariant(e.target.value as Variant)}
            options={[
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
                { value: "terciary", label: "Terciary" },
                { value: "warning", label: "Warning" },
            ]}
            fullWidth
            label="Variante"
        />
    
        <CustomSelect
            value={size}
            onChange={(e) => setSize(e.target.value as "md" | "lg")}
            options={[
                { value: "md", label: "Mediano" },
                { value: "lg", label: "Grande" },
            ]}
            fullWidth
            label="Tamaño"
        />

        <CustomSelect
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value as string)}
            options={[
                { value: "Arial", label: "Arial" },
                { value: "Roboto", label: "Roboto" },
                { value: "Times New Roman", label: "Times New Roman" },
                { value: "Courier New", label: "Courier New" },
            ]}
            fullWidth
            label="Tipo de Fuente"
        />

        <CustomInput label="Mensaje de error" fullWidth value={helperText} onChange={(e) => setHelperText(e.target.value)} size="lg"/>
        <CustomInput label="Tamaño de fuente" fullWidth value={fontSize} onChange={(e) => setFontSize(e.target.value)} size="lg"/>

        <div className="w-auto flex flex-col gap-2">
            <div className="w-auto">
                <CustomSwitch label="Ancho completo" checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} />
            </div>
            <div className="w-auto">
                <CustomSwitch label="Deshabilitado" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            </div>
            <div className="w-auto">
                <CustomSwitch label="Error" checked={error} onChange={(e) => setError(e.target.checked)} />
            </div>
        </div>

        <Typography className="mt-4" sx={{ fontSize: { xs: '16px', sm: '16px', lg: '17px' },fontWeight: 500}}>Vista Previa del Componente</Typography>
        <Paper elevation={3} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <CustomSelect
            value={value}
            onChange={(e) => setValue(e.target.value as string)}
            options={options}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            fontSize={fontSize}
            fontFamily={fontFamily}
            error={error}
            helperText={helperText}
            label="Selecciona una opción"
          />
        </Paper>
      </Stack>
    </ComponentDoc>
  );
};

export default DocumentSelect;
