import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { CustomLink } from "../ui/CustomLink";
import { FaGoogle } from "react-icons/fa";
import { useState, type FC } from "react";
import type { LoginFormProps } from "../../interfaces/login";
import { useAppState } from "../../hooks/useAppState";
import { useAuth } from "../../hooks/useAuth";
import CustomLoadingOverlay from "../ui/CustomLoadingOverlay";

// Validación con Zod
const schema = z.object({
  correo: z
    .string()
    .nonempty("El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido"),
});

type LoginFormData = z.infer<typeof schema>;

const LoginFormEmail: FC<LoginFormProps> = ({ switchToRegister }) => {
  const { setModeLogin, setAuthLoginForm, authLoginForm } = useAppState();
  const { verifyEmail } = useAuth();
   const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: authLoginForm,
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    verifyEmail(data.correo, (exists) => {
      if (exists) {
        setModeLogin("login_two");
      } else {
        setModeLogin("login_three");
      }
      setIsLoading(false);
    });
  };


  const handleChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAuthLoginForm({
      correo: value,
      contraseña: ""
    });
    setValue("correo", value, { shouldValidate: true });
  };

  return (
    <div className="relative flex flex-col gap-6 w-full">
      {isLoading && <CustomLoadingOverlay />}
      {/* Header para desktop */}
      <div className="md:flex flex-col gap-4 items-center justify-center hidden">
        <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
        <p className="text-gray-800 text-base leading-5">
          Ingresa tu correo para acceder a tu cuenta.
        </p>
      </div>

      {/* Header para mobile */}
      <div className="flex flex-col text-start gap-4 text-gray-700 md:hidden">
        <h2 className="text-xl font-bold">¡Bienvenido!</h2>
        <p className="text-base leading-5">
          Ingresa a tu cuenta y accede fácilmente a los avisos que contactaste, tus favoritos, búsquedas guardadas y mucho más.
        </p>
      </div>

      {/* Formulario */}
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomInput
          {...register("correo")}
          value={authLoginForm.correo}
          onChange={handleChangeCorreo}
          label="Correo electrónico"
          type="email"
          fullWidth
          placeholder="Ingrese su correo electrónico"
          size="md"
          error={!!errors.correo}
          helperText={errors.correo?.message}
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

      {/* Divider y Google Auth */}
      <div className="w-full flex flex-col gap-4 md:hidden">
        <div className="w-full flex items-center justify-center">
          <div className="w-full h-[1px] bg-gray-800"></div>
          <p className="w-full text-gray-800 text-base text-center">o ingresa con</p>
          <div className="w-full h-[1px] bg-gray-800"></div>
        </div>

        <CustomButton
          type="button"
          variant="warning"
          fullWidth
          fontSize="14px"
          fontWeight={400}
          text="Ingresa con Google"
          onClick={() => {}}
          icon={<FaGoogle />}
          size="md"
        />
      </div>

      {/* Link para registrarse */}
      <div className="w-full flex flex-col gap-0 items-center justify-center">
        <p className="w-full text-gray-800 leading-5 text-sm text-center">
          ¿Eres un profesional inmobiliario y no tienes cuenta?
        </p>
        <CustomLink
          text="Regístrate aquí"
          variant="primary"
          onClick={switchToRegister}
          fontSize="14px"
        />
      </div>
    </div>
  );
};

export default LoginFormEmail;
