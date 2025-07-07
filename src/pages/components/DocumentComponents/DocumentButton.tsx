import { useState, type ElementType, type FC } from "react";
import { Stack, Box, Typography, Paper } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { CustomButton } from "../../../components/ui/CustomButton";
import type { PropItem, VariantButton } from "../../../interfaces/DocumentComponent";
import { CustomInput } from "../../../components/ui/CustomInput";
import { CustomSelect } from "../../../components/ui/CustomSelected";
import { CustomSwitch } from "../../../components/ui/CustomSwitch";

interface DocumentButtonProps {
  ComponentDoc: ElementType;
}

const DocumentButton: FC<DocumentButtonProps> = ({ ComponentDoc }) => {
    const [variant, setVariant] = useState<VariantButton>("primary");
    const [size, setSize] = useState<"md" | "lg">("lg");
    const [withIcon, setWithIcon] = useState<boolean>(false);
    const [uppercase, setUppercase] = useState<boolean>(false);
    const [fullWidth, setFullWidth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [buttonType, setButtonType] = useState<'button' | 'submit' | 'reset'>('button');
    const [buttonFontSize, setButtonFontSize] = useState<string>('1rem');
    const [buttonFontFamily, setButtonFontFamily] = useState<string>('Arial');
    const [buttonFontWeight, setButtonFontWeight] = useState<string>('600');

    


    const props : PropItem[] = [
      {
          name: "text",
          description: "Texto del botón",
          type: "string",
          required: true,
          example: `"Botón Interactivo"`,
          values: ["Cualquier texto"],
          defaultValue: "-",
          notes: "Texto que se muestra en el botón."
      },
      {
          name: "onClick",
          description: "Función al hacer click",
          type: "() => void",
          required: true,
          example: "() => alert('Botón clickeado')",
          values: ["Función"],
          defaultValue: "-",
          notes: "Callback ejecutado al presionar el botón."
      },
      {
          name: "variant",
          description: "Variante de color del botón",
          type: "Variant",
          required: false,
          example: `'${variant}'`,
          values: ["primary", "secondary", "terciary", "primary-outline", "secondary-outline", "terciary-outline", "warning", "warning-outline"],
          defaultValue: "'primary'",
          notes: "Cambia el color y estilo del botón."
      },
      {
          name: "size",
          description: "Tamaño del botón",
          type: "'md' | 'lg'",
          required: false,
          example: `'${size}'`,
          values: ["md", "lg"],
          defaultValue: "'lg'",
          notes: "Controla el tamaño del botón."
      },
      {
          name: "icon",
          description: "Ícono opcional a mostrar",
          type: "ReactNode",
          required: false,
          example: withIcon ? "<SendIcon />" : "undefined",
          values: ["ReactNode"],
          defaultValue: "undefined",
          notes: "Permite mostrar un ícono junto al texto."
      },
      {
          name: "uppercase",
          description: "Si el texto estará en mayúsculas",
          type: "boolean",
          required: false,
          example: `${uppercase}`,
          values: ["true", "false"],
          defaultValue: "false",
          notes: "Convierte el texto del botón a mayúsculas."
      },
      {
          name: "fullWidth",
          description: "Si el botón ocupará todo el ancho disponible",
          type: "boolean",
          required: false,
          example: `${fullWidth}`,
          values: ["true", "false"],
          defaultValue: "false",
          notes: "Hace que el botón use el ancho completo de su contenedor."
      },
      {
          name: "disabled",
          description: "Si el botón está deshabilitado",
          type: "boolean",
          required: false,
          example: "false",
          values: ["true", "false"],
          defaultValue: "false",
          notes: "Desactiva el botón."
      },
      {
          name: "loading",
          description: "Si muestra un estado de carga",
          type: "boolean",
          required: false,
          example: "false",
          values: ["true", "false"],
          defaultValue: "false",
          notes: "Muestra un icono de carga y deshabilita el botón temporalmente."
      },
      {
          name: "type",
          description: "Tipo del botón (para formularios)",
          type: "'button' | 'submit' | 'reset'",
          required: false,
          example: `'${buttonType}'`,
          values: ["button", "submit", "reset"],
          defaultValue: "'button'",
          notes: "Tipo de botón según el contexto de formulario."
      },
      {
          name: "ariaLabel",
          description: "Etiqueta para accesibilidad",
          type: "string",
          required: false,
          example: `"Botón interactivo"`,
          values: ["Cualquier texto"],
          defaultValue: "undefined",
          notes: "Texto alternativo para lectores de pantalla."
      },
      {
          name: "fontSize",
          description: "Tamaño del texto del botón",
          type: "string",
          required: false,
          example: `'${buttonFontSize}'`,
          values: ["Cualquier valor válido de CSS"],
          defaultValue: "'1rem'",
          notes: "Define el tamaño del texto dentro del botón."
      },
      {
          name: "fontFamily",
          description: "Tipo de fuente del texto del botón",
          type: "string",
          required: false,
          example: `'${buttonFontFamily}'`,
          values: ["Cualquier fuente válida de CSS"],
          defaultValue: "'Arial'",
          notes: "Define la familia de fuente del texto del botón."
      },
      {
        name: "fontWeight",
        description: "Grosor del texto del botón (ej. 'normal', 'bold', 400, 600)",
        type: "string | number",
        required: false,
        example: `'${buttonFontWeight}'`,
        values: ["normal", "bold", "lighter", "100", "300", "400", "500", "600", "700", "800", "900"],
        defaultValue: "600",
        notes: "Define el grosor (peso) de la fuente, no el tamaño ni la familia."
      }

    ];


 return (
  <ComponentDoc name="Botón Personalizado" description="Un botón reutilizable con props dinámicos." props={props}>
    <Stack direction="column" spacing={2}>
      <CustomSelect
        value={variant}
        onChange={(e) => setVariant(e.target.value as VariantButton)}
        options={[
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
          { value: "terciary", label: "Terciary" },
          { value: "warning", label: "Warning" },
          { value: "primary-outline", label: "Primary Outline" },
          { value: "secondary-outline", label: "Secondary Outline" },
          { value: "terciary-outline", label: "Terciary Outline" },
          { value: "warning-outline", label: "Warning Outline" },
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
        value={buttonType}
        onChange={(e) => setButtonType(e.target.value as 'button' | 'submit' | 'reset')}
        options={[
          { value: "button", label: "Button" },
          { value: "submit", label: "Submit" },
          { value: "reset", label: "Reset" },
        ]}
        fullWidth
        label="Tipo de Botón"
      />

      <CustomInput label="Tamaño de Texto" fullWidth value={buttonFontSize} onChange={(e) => setButtonFontSize(e.target.value)} />

      <CustomSelect
        value={buttonFontFamily}
        onChange={(e) => setButtonFontFamily(e.target.value as string)}
        options={[
          { value: "Arial", label: "Arial" },
          { value: "Roboto", label: "Roboto" },
          { value: "Times New Roman", label: "Times New Roman" },
          { value: "Courier New", label: "Courier New" },
        ]}
        fullWidth
        label="Tipo de Fuente"
      />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', gap: 2 }}>
        <div className="w-auto">
          <CustomSwitch label="Mostrar icono" checked={withIcon} onChange={(e) => setWithIcon(e.target.checked)} />
        </div>
        <div className="w-auto">
          <CustomSwitch label="Texto en mayúsculas" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />

        </div>
        <div className="w-auto">
          <CustomSwitch label="Ancho completo" checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} />

        </div>
        <div className="w-auto">
          <CustomSwitch label="Cargando" checked={loading} onChange={(e) => setLoading(e.target.checked)} />

        </div>
        <div className="w-auto">
          <CustomSwitch label="Deshabilitado" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </div>
      </Box>
      <CustomInput label="Tamaño de Fuente" fullWidth value={buttonFontWeight} onChange={(e) => setButtonFontWeight(e.target.value)} />

      <Typography className="mt-4" sx={{ fontSize: { xs: '16px', sm: '16px', lg: '17px' }, fontWeight: 500 }}>
        Vista Previa del Componente
      </Typography>

      <Paper elevation={3} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <Box sx={{ width: fullWidth ? "100%" : "auto" }}>
          <CustomButton
            text="Botón Interactivo"
            onClick={() => alert("Botón clickeado")}
            variant={variant}
            size={size}
            icon={withIcon ? <SendIcon /> : undefined}
            uppercase={uppercase}
            fullWidth={fullWidth}
            disabled={disabled}
            loading={loading}
            type={buttonType}
            ariaLabel="Botón interactivo"
            fontSize={buttonFontSize}
            fontFamily={buttonFontFamily}
            fontWeight={buttonFontWeight}
          />
        </Box>
      </Paper>
    </Stack>
  </ComponentDoc>
);


};

export default DocumentButton;
