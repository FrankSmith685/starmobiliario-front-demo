import { useState, type ElementType, type FC } from "react";
import {
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { CustomInput } from "../../../components/ui/CustomInput";
import type { PropItem, Variant } from "../../../interfaces/DocumentComponent";
import { CustomCheckbox } from "../../../components/ui/CustomCheckbox";
import { CustomSelect } from "../../../components/ui/CustomSelected";

interface DocumentProps {
  ComponentDoc: ElementType;
}

const DocumentCheckbox: FC<DocumentProps> = ({ ComponentDoc }) => {
  const [variant, setVariant] = useState<Variant>("primary");
  const [fontSize, setFontSize] = useState("1rem");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [labelText, setLabelText] = useState("Aceptar condiciones");
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<"md" | "lg">("lg");

const props: PropItem[] = [
  { name: "label", description: "Texto de la etiqueta", type: "string", required: true, example: JSON.stringify(labelText), values: ["Texto"], defaultValue: '""', notes: "Etiqueta visible junto al checkbox." },
  { name: "checked", description: "Estado del checkbox", type: "boolean", required: true, example: JSON.stringify(checked), values: ["true", "false"], defaultValue: "false", notes: "Define si el checkbox está marcado." },
  { name: "onChange", description: "Función al cambiar", type: "(e) => void", required: true, example: "onChange={(e) => setChecked(e.target.checked)}", values: ["Función"], defaultValue: "-", notes: "Se ejecuta cuando cambia el estado del checkbox." },
  { name: "variant", description: "Variante de color", type: '"primary" | "secondary" | "terciary" | "warning"', required: false, example: JSON.stringify(variant), values: ["primary", "secondary", "terciary", "warning"], defaultValue: '"primary"', notes: "Estilo visual del checkbox." },
  { name: "fontSize", description: "Tamaño de fuente", type: "string", required: false, example: JSON.stringify(fontSize), values: ["Cualquier tamaño válido"], defaultValue: '"1rem"', notes: "Tamaño del texto de la etiqueta." },
  { name: "fontFamily", description: "Tipo de fuente", type: "string", required: false, example: JSON.stringify(fontFamily), values: ["Cualquier fuente"], defaultValue: '"Arial"', notes: "Fuente del texto de la etiqueta." },
  { name: "disabled", description: "Deshabilitar checkbox", type: "boolean", required: false, example: JSON.stringify(disabled), values: ["true", "false"], defaultValue: "false", notes: "Si el checkbox está inactivo." },
  { name: "size", description: "Tamaño del checkbox", type: '"md" | "lg"', required: false, example: JSON.stringify(size), values: ["md", "lg"], defaultValue: '"lg"', notes: "Controla el tamaño visual del componente." }
];

  return (
    <ComponentDoc
      name="CheckBox Personalizado"
      description="Un checkbox estilizado con props dinámicos."
      props={props}
    >
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

        <CustomInput
          label="Texto de la etiqueta"
          fullWidth
          value={labelText}
          onChange={(e) => setLabelText(e.target.value)}
          size="lg"
        />

        <CustomInput
          label="Tamaño de fuente"
          fullWidth
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          size="lg"
        />

        <div className="w-auto flex flex-col gap-2">
          <CustomCheckbox
            label="Seleccionado"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            variant={variant}
          />
          <CustomCheckbox
            label="Deshabilitado"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
            variant={variant}
          />
        </div>

        <Typography className="mt-4" sx={{ fontSize: { xs: "16px", sm: "16px", lg: "17px" }, fontWeight: 500 }}>
          Vista Previa del Componente
        </Typography>

        <Paper elevation={3} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <CustomCheckbox
            label={labelText}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            variant={variant}
            fontSize={fontSize}
            fontFamily={fontFamily}
            disabled={disabled}
            size={size}
          />
        </Paper>
      </Stack>
    </ComponentDoc>
  );
};

export default DocumentCheckbox;
