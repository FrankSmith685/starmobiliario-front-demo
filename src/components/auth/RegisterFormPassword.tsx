import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import type { LoginFormProps } from "../../interfaces/login";
import { type FC } from "react";
import { useAppState } from "../../hooks/useAppState";
import { useAuth } from "../../hooks/useAuth";



// Validación con Zod
const schema = z.object({
  contraseña: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof schema>;

const RegisterFormPassword: FC<LoginFormProps> = () => {
  const { authLoginForm, setAuthLoginForm, setModeLogin,authRegisterForm, setModal,setMode, setMenuOpen } = useAppState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { contraseña: authLoginForm.contraseña },
    mode: "onTouched",
  });

  const {registerUser} = useAuth();
 

 const onSubmit = async (data: LoginFormData) => {
  const newData = {
    tipoUsuario: authRegisterForm.tipoUsuario || 1,
    correo: authLoginForm.correo,
    contraseña: data.contraseña,
    nombre: authRegisterForm.nombre || "",
    apellido: authRegisterForm.apellido ?? null,
    razon_social: authRegisterForm.razon_social ?? null,
    tipoDocumento: authRegisterForm.tipoDocumento || 1,
    nroDocumento: authRegisterForm.nroDocumento || "",
    telefono: authRegisterForm.telefono || "",
    telefono_movil: authRegisterForm.telefono_movil || "",
  };

  await registerUser(newData, (res) => {
    if (res.success) {
      setModal(false)
      setMode('login');
      setAuthLoginForm({
        correo:"",
        contraseña:""
      });
      setModeLogin('login_one');
      setMenuOpen(false);
    }
  });
};


  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAuthLoginForm({
      ...authLoginForm,
      contraseña: value,
    });
    setValue("contraseña", value, { shouldValidate: true });
  };

  const handleClickAtras = (): void => {
    setModeLogin("login_one");
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="!w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 hidden md:flex w-full text-center items-center justify-center">Registrate</h2>
        <div className=" cursor-pointer text-gray-700 hover:underline !w-[60px] gap-2 flex items-center" onClick={handleClickAtras}>
          <FaArrowLeft className="text-sm" />
          <span className="w-auto">Atrás</span>
        </div>
        <h2 className="text-xl text-start font-bold text-gray-800">¡Bienvenido!</h2>
        <p className="w-full text-gray-700 text-base leading-5 text-start font-bold">
          Crea tu contraseña para continuar
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomInput
          {...register("contraseña")}
          value={authLoginForm.contraseña}
          onChange={handleChangePassword}
          label="Contraseña"
          type="password"
          fullWidth
          placeholder="Ingrese su contraseña"
          size="md"
          error={!!errors.contraseña}
          helperText={errors.contraseña?.message}
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

export default RegisterFormPassword;
