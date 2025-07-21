import { useState, type ElementType, type FC } from "react";
import {
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { CustomInput } from "../../../components/ui/CustomInput";
import { CustomSwitch } from "../../../components/ui/CustomSwitch";
import type { Variant, PropItem } from "../../../interfaces/DocumentComponent";
import { CustomSelected } from "../../../components/ui/CustomSelected";

interface DocumentProps {
  ComponentDoc: ElementType;
}

const DocumentSwitch: FC<DocumentProps> = ({ ComponentDoc }) => {
  const [variant, setVariant] = useState<Variant>("primary");
  const [fontSize, setFontSize] = useState("1rem");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [labelText, setLabelText] = useState("Activar notificaciones");
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<"md" | "lg">("md");

  const props: PropItem[] = [
    {
        name: "label",
        description: "Texto que acompaña al interruptor",
        type: "string",
        required: false,
        example: JSON.stringify(labelText),
        values: ["Texto"],
        defaultValue: '""',
        notes: "Etiqueta visible junto al interruptor."
    },
    {
        name: "checked",
        description: "Estado del interruptor",
        type: "boolean",
        required: true,
        example: JSON.stringify(checked),
        values: ["true", "false"],
        defaultValue: "false",
        notes: "Determina si el switch está activado o no."
    },
    {
        name: "onChange",
        description: "Función que se ejecuta al cambiar el estado",
        type: "(e: ChangeEvent<HTMLInputElement>) => void",
        required: true,
        example: "onChange={(e) => setChecked(e.target.checked)}",
        values: ["Función"],
        defaultValue: "-",
        notes: "Callback para manejar el cambio del estado del switch."
    },
    {
        name: "variant",
        description: "Variante de color del switch",
        type: '"primary" | "secondary" | "terciary" | "warning"',
        required: false,
        example: JSON.stringify(variant),
        values: ["primary", "secondary", "terciary", "warning"],
        defaultValue: '"primary"',
        notes: "Define el estilo de color del componente."
    },
    {
        name: "fontSize",
        description: "Tamaño de fuente del label",
        type: "string",
        required: false,
        example: JSON.stringify(fontSize),
        values: ["Cualquier tamaño válido"],
        defaultValue: '"1rem"',
        notes: "Tamaño del texto que acompaña al switch."
    },
    {
        name: "fontFamily",
        description: "Tipo de fuente del label",
        type: "string",
        required: false,
        example: JSON.stringify(fontFamily),
        values: ["Arial", "Roboto", "Courier New", "Times New Roman", "etc."],
        defaultValue: '"Arial"',
        notes: "Fuente del texto del label."
    },
    {
        name: "disabled",
        description: "Desactiva el switch",
        type: "boolean",
        required: false,
        example: JSON.stringify(disabled),
        values: ["true", "false"],
        defaultValue: "false",
        notes: "Si el interruptor debe estar deshabilitado."
    },
    {
        name: "size",
        description: "Tamaño del componente",
        type: '"md" | "lg"',
        required: false,
        example: JSON.stringify(size),
        values: ["md", "lg"],
        defaultValue: '"md"',
        notes: "Controla el tamaño general del componente y su fuente."
    }
    ];


  return  (
    <ComponentDoc
      name="Switch Personalizado"
      description="Un interruptor (Switch) estilizado con props dinámicos y variantes personalizadas."
      props={props}
    >
      <Stack direction="column" spacing={2}>

        <CustomSelected
          value={variant}
          onChange={(e) => setVariant(e.target.value as Variant)}
          options={[
            { value: "primary", label: "Primary" },
            { value: "secondary", label: "Secondary" },
            { value: "terciary", label: "Terciary" },
            { value: "warning", label: "Warning" }
          ]}
          fullWidth
           label="Variante"
        />

        <CustomSelected
          value={size}
          onChange={(e) => setSize(e.target.value as "md" | "lg")}
          options={[
            { value: "md", label: "Mediano" },
            { value: "lg", label: "Grande" }
          ]}
          fullWidth
           label="Tamaño"
        />

        <CustomSelected
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value as string)}
          options={[
            { value: "Arial", label: "Arial" },
            { value: "Roboto", label: "Roboto" },
            { value: "Times New Roman", label: "Times New Roman" },
            { value: "Courier New", label: "Courier New" }
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
            <CustomSwitch
                label="Seleccionado"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />

            <CustomSwitch
                label="Deshabilitado"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
            />
            </div>


        <Typography className="mt-4" sx={{ fontSize: { xs: '16px', sm: '16px', lg: '17px' }, fontWeight: 500 }}>
          Vista Previa del Componente
        </Typography>

        <Paper elevation={3} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <CustomSwitch
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

export default DocumentSwitch;
