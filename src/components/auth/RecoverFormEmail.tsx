import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import type { LoginFormProps } from "../../interfaces/login";
import { useState, type FC } from "react";
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


const RecoverFormEmail: FC<LoginFormProps> = () => {
  const {setModeLogin,authLoginForm} = useAppState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { correo: authLoginForm.correo },
    mode: "onTouched",
  });

  const {sendResetEmail} = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    sendResetEmail(data.correo, ({ success, message }) => {
      if (success) {
        setIsLoading(false);
        setModeLogin("recover_two");
      } else {
        setIsLoading(false);
        setError("correo", {
          type: "manual",
          message: message || "El correo no existe",
        });
      }
    });
  };


  const handleClickAtras=():void =>{
    setModeLogin('login_two');
  }

  return (
    <div className="relative flex flex-col gap-6 w-full h-full">
      {isLoading ? <CustomLoadingOverlay /> : (
        <>
          <div className="!w-full flex flex-col gap-4">
            <div className=" cursor-pointer text-gray-700 hover:underline !w-[60px] gap-2 flex items-center" onClick={handleClickAtras}>
                <FaArrowLeft className="text-sm"/>
                <span className="w-auto">Atrás</span>
            </div>
            <h2 className="text-xl text-start font-bold text-gray-800">¿Olvidaste tu contraseña?</h2>
            <p className="w-full text-gray-700 text-base leading-5 text-start font-bold">
              Ingresa tu correo y te enviaremos los pasos para cambiarla
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Password */}
            <Controller
              name="correo"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Correo electrónico"
                  type="email"
                  fullWidth
                  placeholder="Ingrese tu correo electrónico"
                  size="md"
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
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
        </>
      )}
    </div>
  );
};

export default RecoverFormEmail;
