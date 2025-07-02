import { useState, type ElementType, type FC } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import { CustomInput, type Variant } from "../../../components/ui/CustomInput";
import type { PropItem } from "../../../interfaces/DocumentComponent";
import { CustomSelect } from "../../../components/ui/CustomSelected";
import { CustomSwitch } from "../../../components/ui/CustomSwitch";

interface DocumentInputProps {
  ComponentDoc: ElementType;
}

const DocumentInput: FC<DocumentInputProps> = ({ ComponentDoc }) => {
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<"md" | "lg">("md");
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('text');
  const [fontSize, setFontSize] = useState<string>('1rem');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [value, setValue] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('Etiqueta');
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>('');
  const [multiline, setMultiline] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(3);

  const props: PropItem[] = [
    { name: "value", description: "Valor del input", type: "string", required: true, example: JSON.stringify(value), values: [value], defaultValue: '""', notes: "Valor controlado del input." },
    { name: "onChange", description: "Función al cambiar el valor", type: "(e) => void", required: true, example: 'onChange={(e) => setValue(e.target.value)}', values: ["Función"], defaultValue: "-", notes: "Callback de cambio de valor." },
    { name: "placeholder", description: "Texto de marcador de posición", type: "string", required: false, example: '"Ingrese texto..."', values: ["Texto"], defaultValue: '""', notes: "Texto mostrado cuando el input está vacío." },
    { name: "type", description: "Tipo de input", type: '"text" | "number" | "password" | "search"', required: false, example: JSON.stringify(inputType), values: ["text", "number", "password", "search"], defaultValue: '"text"', notes: "Tipo de dato del input." },
    { name: "variant", description: "Variante de color", type: '"primary" | "secondary" | "terciary" | "warning"', required: false, example: JSON.stringify(variant), values: ["primary", "secondary", "terciary", "warning"], defaultValue: '"primary"', notes: "Estilo de color del input." },
    { name: "size", description: "Tamaño del input", type: '"md" | "lg"', required: false, example: JSON.stringify(size), values: ["md", "lg"], defaultValue: '"lg"', notes: "Tamaño del componente." },
    { name: "fullWidth", description: "Ancho completo", type: "boolean", required: false, example: JSON.stringify(fullWidth), values: ["true", "false"], defaultValue: "false", notes: "Si ocupa el ancho total." },
    { name: "disabled", description: "Deshabilita el input", type: "boolean", required: false, example: JSON.stringify(disabled), values: ["true", "false"], defaultValue: "false", notes: "Si el input está deshabilitado." },
    { name: "fontSize", description: "Tamaño de fuente", type: "string", required: false, example: JSON.stringify(fontSize), values: ["Cualquier tamaño válido"], defaultValue: '"1rem"', notes: "Tamaño de la fuente del input." },
    { name: "fontFamily", description: "Tipo de fuente", type: "string", required: false, example: JSON.stringify(fontFamily), values: ["Cualquier fuente"], defaultValue: '"Arial"', notes: "Fuente del texto." },
    { name: "label", description: "Etiqueta del input", type: "string", required: false, example: JSON.stringify(label), values: ["Texto"], defaultValue: '""', notes: "Etiqueta flotante del input." },
    { name: "required", description: "Obligatorio", type: "boolean", required: false, example: JSON.stringify(required), values: ["true", "false"], defaultValue: "false", notes: "Si el campo es requerido." },
    { name: "error", description: "Indica error", type: "boolean", required: false, example: JSON.stringify(error), values: ["true", "false"], defaultValue: "false", notes: "Estilo de error." },
    { name: "helperText", description: "Texto de ayuda o error", type: "string", required: false, example: JSON.stringify(helperText), values: ["Texto"], defaultValue: '""', notes: "Texto de ayuda debajo del input." },
    { name: "multiline", description: "Modo multilínea", type: "boolean", required: false, example: JSON.stringify(multiline), values: ["true", "false"], defaultValue: "false", notes: "Si permite múltiples líneas." },
    { name: "rows", description: "Número de filas", type: "number", required: false, example: JSON.stringify(rows), values: ["Número"], defaultValue: "3", notes: "Cantidad de filas en multilínea." }
  ];


  return (
    <ComponentDoc name="Input Personalizado" description="Un campo de entrada reutilizable con props dinámicos." props={props}>
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
          value={inputType}
          onChange={(e) => setInputType(e.target.value as string)}
          options={[
            { value: "text", label: "Texto" },
            { value: "number", label: "Número" },
            { value: "password", label: "Contraseña" },
            { value: "search", label: "Búsqueda" },
          ]}
          fullWidth
          label="Tipo de Input"
        />

        <CustomInput label="Tamaño de Texto" fullWidth value={fontSize} onChange={(e) => setFontSize(e.target.value)} size="lg"/>

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

        <div className="w-auto flex flex-col gap-2">
            <div className="w-auto">
              <CustomSwitch label="Ancho completo" checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} />
            </div>
            <div className="w-auto">
              <CustomSwitch label="Deshabilitado" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            </div>
            <div className="w-auto">
              <CustomSwitch label="Obligatorio" checked={required} onChange={(e) => setRequired(e.target.checked)} />
            </div>
        </div>

        <CustomInput label="Etiqueta" fullWidth value={label} onChange={(e) => setLabel(e.target.value)} size="lg"/>
        <div className="w-auto">
            <CustomSwitch label="Error" checked={error} onChange={(e) => setError(e.target.checked)} />
        </div>
        
        <CustomInput label="Mensaje de error" fullWidth value={helperText} onChange={(e) => setHelperText(e.target.value)} size="lg"/>
        <div className="w-auto">
          <CustomSwitch label="Multilínea" checked={multiline} onChange={(e) => setMultiline(e.target.checked)} />
        </div>
        <CustomInput label="Filas" type="number" fullWidth value={rows} onChange={(e) => setRows(Number(e.target.value))} size="lg"/>

         <Typography className="mt-4" sx={{ fontSize: { xs: '16px', sm: '16px', lg: '17px' },fontWeight: 500}}>Vista Previa del Componente</Typography>
            <Paper elevation={3} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-auto">
                    <CustomInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Ingrese texto..."
                        type={inputType}
                        variant={variant}
                        size={size}
                        fullWidth={fullWidth}
                        disabled={disabled}
                        fontSize={fontSize}
                        fontFamily={fontFamily}
                        label={label}
                        required={required}
                        error={error}
                        helperText={helperText}
                        multiline={multiline}
                        rows={rows}
                    />
                </div>
            </Paper>
      </Stack>
    </ComponentDoc>
  );
};

export default DocumentInput;
