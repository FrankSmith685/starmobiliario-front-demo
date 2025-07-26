import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../../../../ui/CustomInput";
import { CustomButton } from "../../../../ui/CustomButton";
import { useEffect, useState } from "react";
import CustomLoadingOverlay from "../../../../ui/CustomLoadingOverlay";
import { useAppState } from "../../../../../hooks/useAppState";
import { useUser } from "../../../../../hooks/useUser";
import type { UpdateUsuarioCompleto } from "../../../../../interfaces/user";
import { useNotification } from "../../../../../hooks/useNotificacionHooks/useNotification";

const datosSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "El nombre solo puede contener letras y espacios")
    .nonempty("El nombre es obligatorio"),

  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "El apellido solo puede contener letras y espacios")
    .nonempty("El apellido es obligatorio"),

  documento: z
    .string()
    .nonempty("El número de documento es obligatorio")
    .regex(/^\d+$/, "El documento debe contener solo números")
    .min(6, "El documento debe tener al menos 6 dígitos")
    .max(15, "El documento no puede tener más de 15 dígitos"),

  email: z
    .string()
    .nonempty("El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido"),

  telefono: z.string().optional(),

  celular: z
    .string()
    .nonempty("El número de celular es obligatorio")
    .regex(/^\d+$/, "El celular solo puede contener números")
    .min(6, "El celular es demasiado corto")
    .max(15, "El celular es demasiado largo"),
});


type DatosFormData = z.infer<typeof datosSchema>;

const Datos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppState();
  const {updateUser} = useUser();
  const {showMessage} = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DatosFormData>({
    mode: "onChange",
    resolver: zodResolver(datosSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      documento: "",
      email: "",
      telefono: "",
      celular: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        documento: user.documento?.nro_documento || "",
        email: user.correo || "",
        telefono: user.telefono || "",
        celular: user.telefono_movil || "",
      });
    }
  }, [user, reset]);


  const onSubmit = (formData: DatosFormData) => {
    if (!user) return;

    const payload: UpdateUsuarioCompleto = {
      cod_usuario: user.cod_usuario,
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      telefono_movil: formData.celular,
      documento: {
        cod_tipo_documento: 1,
        nro_documento: formData.documento
      }
    };

    setIsLoading(true);

    updateUser(payload, (updatedUser,message) => {
      reset({
        nombre: updatedUser.nombre || "",
        apellido: updatedUser.apellido || "",
        documento: updatedUser.documento?.nro_documento || "",
        email: updatedUser.correo || "",
        telefono: updatedUser.telefono || "",
        celular: updatedUser.telefono_movil || "",
      });
      showMessage( message ?? "Datos actualizados correctamente", "success");
      setIsLoading(false);
    });
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
      {isLoading && <CustomLoadingOverlay />}

      <div>
        <h3 className="text-xl font-bold mb-2">Datos</h3>
      </div>

      {/* Datos Personales */}
      <section>
        <h4 className="font-semibold text-base mb-1">Personales</h4>
        <p className="text-sm text-gray-600 mb-4">Completa con tus datos personales.</p>
        <div className="grid grid-cols-1 gap-4 w-full md:max-w-[400px]">
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
                label="Nombre"
                placeholder="Ej: Juan"
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            )}
          />
          <Controller
            name="apellido"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Apellido"
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                placeholder="Ej: Pérez"
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
              />
            )}
          />
          <Controller
            name="documento"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Documento"
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                placeholder="Ej: 12345678"
                error={!!errors.documento}
                helperText={errors.documento?.message}
              />
            )}
          />
        </div>
      </section>

      {/* Datos de Contacto */}
      <section>
        <h4 className="font-semibold text-base mb-1">Contacto</h4>
        <p className="text-sm text-gray-600 mb-4 w-full md:max-w-[400px]">
          Estos datos son para que podamos enviarte información, ofertas y, si publicaste un aviso, para que puedan contactarte.
        </p>

        <div className="grid grid-cols-1 gap-4 w-full md:max-w-[400px]">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Correo"
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                placeholder="ejemplo@correo.com"
                disabled
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Teléfono (opcional)"
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                placeholder="Ej: 011 4321-5678 (opcional)"
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            )}
          />
          <Controller
            name="celular"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Celular"
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                placeholder="Ej: 1123456789"
                error={!!errors.celular}
                helperText={errors.celular?.message}
              />
            )}
          />
        </div>
      </section>

      {/* Botón Guardar */}
      <div className={`${isLoading ? 'hidden' : ''} pt-4 w-full md:max-w-[400px]`}>
        <CustomButton
          text="Guardar cambios"
          type="submit"
          fullWidth
          fontSize="14px"
          variant="primary"
        />
      </div>
    </form>
  );
};

export default Datos;
