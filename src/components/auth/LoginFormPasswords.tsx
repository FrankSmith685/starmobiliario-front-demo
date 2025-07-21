import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { CustomLink } from "../ui/CustomLink";
import { FaArrowLeft } from "react-icons/fa";
import type { LoginFormProps } from "../../interfaces/login";
import type { FC } from "react";
import { useAppState } from "../../hooks/useAppState";
import { useAuth } from "../../hooks/useAuth";

// Validación con Zod
const schema = z.object({
  contraseña: z.string().nonempty("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof schema>;


const LoginFormPassword: FC<LoginFormProps> = () => {
  const {setModeLogin,authLoginForm, setModal,setMode , setAuthLoginForm, setMenuOpen} = useAppState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { contraseña: authLoginForm.contraseña },
    mode: "onTouched",
  });

  const {loginUser} = useAuth();
  

  const onSubmit = (data: LoginFormData) => {
    loginUser({correo:authLoginForm.correo,contraseña:data.contraseña},({ success, message }) => {
      if (success) {
        setModal(false)
        setMode('login');
        setAuthLoginForm({
          correo:"",
          contraseña:""
        });
        setModeLogin('login_one');
        setMenuOpen(false);
      } else {
        setError("contraseña", {
          type: "manual",
          message: message || "La contraseña es incorrecta",
        });
      }
    });
  };


  const handleClickAtras=():void =>{
    setModeLogin('login_one');
  }

  const handleClickForgotPassword=():void=>{
    setModeLogin('recover_one');
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="!w-full flex flex-col gap-4">
         <h2 className="text-2xl font-bold text-gray-800 hidden md:flex w-full text-center items-center justify-center">Iniciar Sesión</h2>
        <div className=" cursor-pointer text-gray-700 hover:underline !w-[60px] gap-2 flex items-center" onClick={handleClickAtras}>
            <FaArrowLeft className="text-sm"/>
            <span className="w-auto">Atrás</span>
        </div>
        <h2 className="text-xl text-start font-bold text-gray-800">¡Nos encanta tenerte de vuelta!</h2>
        <p className="w-full text-gray-700 text-base leading-5 text-start font-bold">
          Ingresa tu contraseña para continuar
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}noValidate>

        {/* Password */}
        <Controller
          name="contraseña"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Contraseña"
              type="password"
              fullWidth
              placeholder="Ingrese su contraseña"
              size="md"
              error={!!errors.contraseña}
              helperText={errors.contraseña?.message}
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

      <div className="w-full flex flex-col gap-0 items-center justify-center">
        <CustomLink
          text="Olvidé mi contraseña"
          variant="primary"
          onClick={handleClickForgotPassword}
          fontSize="14px"
        />
      </div>
    </div>
  );
};

export default LoginFormPassword;
