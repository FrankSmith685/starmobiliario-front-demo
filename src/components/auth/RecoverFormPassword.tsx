import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import type { LoginFormProps } from "../../interfaces/login";
import type { FC } from "react";
import { useAppState } from "../../hooks/useAppState";
import { useAuth } from "../../hooks/useAuth";

// ✅ Validación con Zod
const schema = z
  .object({
    contraseña: z
      .string()
      .nonempty("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarContraseña: z
      .string()
      .nonempty("Confirma tu contraseña"),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    path: ["confirmarContraseña"],
    message: "Las contraseñas no coinciden",
  });

type LoginFormData = z.infer<typeof schema>;

const RecoverFormPassword: FC<LoginFormProps> = () => {
  const {
    setModeLogin,
    authLoginForm,
    setModal,
    setMode,
    setAuthLoginForm,
    setMenuOpen,
  } = useAppState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contraseña: "",
      confirmarContraseña: "",
    },
    mode: "onTouched",
  });

  const { resetPassword } = useAuth();

  const onSubmit = (data: LoginFormData) => {
    const { contraseña } = data;
    const token = authLoginForm.token;

    if (!token) {
      setError("contraseña", {
        type: "manual",
        message: "Token no disponible. Intenta de nuevo.",
      });
      return;
    }

    resetPassword(token, contraseña, ({ success, message }) => {
      if (success) {
        setModal(false);
        setMode("login");
        setAuthLoginForm({
          correo: "",
          contraseña: "",
          token: "",
        });
        setModeLogin("login_one");
        setMenuOpen(false);
      } else {
        setError("contraseña", {
          type: "manual",
          message: message || "No se pudo restablecer la contraseña.",
        });
      }
    });
  };


  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="!w-full flex flex-col gap-4">
        <h2 className="text-xl text-start font-bold text-gray-800">
          ¡Nos encanta tenerte de vuelta!
        </h2>
        <p className="w-full text-gray-700 text-base leading-5 text-start font-bold">
          Ingresa tu nueva contraseña para continuar
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Nueva contraseña */}
        <Controller
          name="contraseña"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Nueva contraseña"
              type="password"
              fullWidth
              placeholder="Ingrese su nueva contraseña"
              size="md"
              error={!!errors.contraseña}
              helperText={errors.contraseña?.message}
            />
          )}
        />

        {/* Confirmar contraseña */}
        <Controller
          name="confirmarContraseña"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Confirmar contraseña"
              type="password"
              fullWidth
              placeholder="Repite la contraseña"
              size="md"
              error={!!errors.confirmarContraseña}
              helperText={errors.confirmarContraseña?.message}
            />
          )}
        />

        <CustomButton
          type="submit"
          variant="primary"
          size="md"
          fontSize="14px"
          fontWeight={600}
          text="Continuar"
          fullWidth
        />
      </form>
    </div>
  );
};

export default RecoverFormPassword;
