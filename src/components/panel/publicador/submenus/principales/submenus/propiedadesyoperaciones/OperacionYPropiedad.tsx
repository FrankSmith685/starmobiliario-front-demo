import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import TabSelector from "./components/TabSelector";
import { CustomSelected } from "../../../../../../ui/CustomSelected";
import { CustomButton } from "../../../../../../ui/CustomButton";

const tipoInmuebleOptions = [
  { label: "Casa", value: "casa" },
  { label: "Departamento", value: "departamento" },
  { label: "Local Comercial", value: "local_comercial" },
];

const subtipoOptionsMap: Record<string, { label: string; value: string }[]> = {
  casa: [
    { label: "Casa de campo", value: "campo" },
    { label: "Casa de playa", value: "playa" },
  ],
  departamento: [
    { label: "Flat", value: "flat" },
    { label: "Dúplex", value: "duplex" },
  ],
  local_comercial: [
    { label: "Tienda", value: "tienda" },
    { label: "Oficina", value: "oficina" },
  ],
};

// Validación con zod
const schema = z.object({
  tipo: z.string().nonempty("El tipo de inmueble es obligatorio"),
  subtipo: z.string().nonempty("El subtipo de inmueble es obligatorio"),
});

type FormData = z.infer<typeof schema>;

const OperacionYPropiedad = () => {
  const [operacion, setOperacion] = useState<string | null>(null);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo: "",
      subtipo: "",
    },
  });

  const tipoSeleccionado = watch("tipo");

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", {
      operacion,
      ...data,
    });
  };

  const handleClickGuardarYSalir=()=>{
    console.log("Guardando y saliendo...");
    // Aquí puedes implementar la lógica para guardar los datos y salir
  }

  return (
    <div className="w-full text-gray-800 max-w-[600px]">
      <h3 className="text-lg font-bold mb-4">¡Hola usuario, empecemos a crear tu aviso!</h3>

      <div className="w-full p-4 bg-white rounded-lg shadow-md flex flex-col gap-6">
        {/* Sección de operación */}
        <div className="flex flex-col items-start gap-2">
          <h4 className="text-xl font-semibold">¿Qué quieres publicar?</h4>
          <p className="text-sm text-gray-600">
            Selecciona la operación que deseas publicar.
          </p>
          <TabSelector selected={operacion} onSelect={setOperacion} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full gap-6 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="w-full flex flex-col gap-3">
                <label className="block text-sm font-medium">Tipo de inmueble</label>
                <Controller
                    name="tipo"
                    control={control}
                    render={({ field }) => (
                        <CustomSelected
                        {...field}
                        options={tipoInmuebleOptions}
                        label="Selecciona el tipo de inmueble"
                        fullWidth
                        error={!!errors.tipo}
                        helperText={errors.tipo?.message}
                        onChange={(e) => {
                            field.onChange(e);
                            setValue("subtipo", ""); // Resetear subtipo
                        }}
                        />
                    )}
                />
            </div>
            <div className="w-full flex flex-col gap-3">
                <label className="block text-sm font-medium">Subtipo de inmueble</label>
                <Controller
                name="subtipo"
                control={control}
                render={({ field }) => (
                    <CustomSelected
                    {...field}
                    options={subtipoOptionsMap[tipoSeleccionado] || []}
                    label="Selecciona el subtipo de inmueble"
                    fullWidth
                    disabled={!tipoSeleccionado}
                    error={!!errors.subtipo}
                    helperText={errors.subtipo?.message}
                    />
                )}
                />
            </div>
          </div>

          <div className="w-full flex flex-row gap-4 items-center justify-end">
            <CustomButton
                type="button"
                variant="primary-outline"
                size="lg"
                fontSize="14px"
                fontWeight={600}
                text="Guardar y Salir"
                onClick={handleClickGuardarYSalir}
            />
            <CustomButton
                type="submit"
                variant="primary"
                size="lg"
                fontSize="14px"
                fontWeight={600}
                text="Continuar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperacionYPropiedad;
