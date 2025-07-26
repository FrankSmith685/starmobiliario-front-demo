/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, Controller  } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "../ui/CustomInput";
import { CustomButton } from "../ui/CustomButton";
import { CustomSelected } from "../ui/CustomSelected";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import type { TypeUser } from "../../interfaces/user";
import { useDocument } from "../../hooks/useDocument";
import type { TypeDocument } from "../../interfaces/document";
import { CustomLink } from "../ui/CustomLink";
import { FaArrowLeft } from "react-icons/fa";
import { useAppState } from "../../hooks/useAppState";
import { useAuth } from "../../hooks/useAuth";

// Validación Zod
const schema = z
  .object({
    userType: z.string().nonempty("El tipo de usuario es obligatorio"),
    email: z
      .string()
      .nonempty("El correo electrónico es obligatorio")
    .email("Ingresa un correo electrónico válido"),
    password: z
      .string()
      .nonempty("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    name: z.string()
    .nonempty("El nombre es obligatorio")
    .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, "El nombre solo puede contener letras"),
    lastname: z.string()
    .optional()
    .refine(
      (val) => !val || /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(val),
      "El apellido solo puede contener letras"
    ),
    razonSocial: z.string()
    .max(100, "La razón social no debe exceder los 100 caracteres").optional(),
    documentType: z.string().nonempty("El tipo de documento es obligatorio"),
    document: z.string()
    .nonempty("El número de documento es obligatorio")
    .regex(/^\d+$/, "El documento debe contener solo números")
    .min(6, "El documento debe tener al menos 6 dígitos")
    .max(15, "El documento no puede tener más de 15 dígitos"),
    telephone: z.string()
    .nonempty("El número de celular es obligatorio")
    .regex(/^\d+$/, "El celular solo puede contener números")
    .min(6, "El celular es demasiado corto")
    .max(15, "El celular es demasiado largo"),
  })
  .superRefine((data, ctx) => {
    const isRUC = data.documentType === "2";
    const hasLastname = !!data.lastname?.trim();
    const hasRazon = !!data.razonSocial?.trim();

    if (isRUC && !hasRazon) {
      ctx.addIssue({
        path: ["razonSocial"],
        message: "La razón social es obligatoria",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!isRUC && !hasLastname) {
      ctx.addIssue({
        path: ["lastname"],
        message: "El apellido es obligatorio",
        code: z.ZodIssueCode.custom,
      });
    }
  });

type RegisterFormData = z.infer<typeof schema>;


const RegisterForm = ({ switchToLogin }: { switchToLogin: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors,isValid  },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userType: "",
      email: "",
      password: "",
      name: "",
      lastname:"",
      razonSocial: "",
      documentType: "",
      document: "",
      telephone:"",
    },
    mode: "onChange", 
  });

  const {getAllUserTypes} = useUser();
  const {getAllDocumentTypes} = useDocument();
  const userTypeValue = watch("userType");
  const {registerUser} = useAuth();

  const isDisabled = !userTypeValue;

  const documentTypeValue = watch("documentType");

  const {setMenuOpen, setModal, setMode, setModeLogin} = useAppState();

useEffect(() => {
  if (userTypeValue !== "1") {
     const razonSocialValue = watch("razonSocial");
    setValue("razonSocial", razonSocialValue);
  } else {
   const lastnameValue = watch("lastname");
    setValue("lastname", lastnameValue);
  }
}, [userTypeValue, setValue,watch]);


useEffect(() => {
  if (documentTypeValue === "2") {
    const razonSocialValue = watch("razonSocial");
    setValue("razonSocial", razonSocialValue);
  } else {
    const lastnameValue = watch("lastname");
    setValue("lastname", lastnameValue);
  }
  // trigger();
}, [documentTypeValue, setValue,watch]);

  const [tiposUsuario, setTiposUsuario] = useState<TypeUser[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TypeDocument[]>([]);
  const [errorRegister,setErrorRegister] = useState<string | null>(null);

  useEffect(() => {
    getAllUserTypes((tipos) => {
      setTiposUsuario(tipos);
    });
  }, []);

  useEffect(() => {
    getAllDocumentTypes((tipos) => {
      setTiposDocumento(tipos);
    });
  }, []);

  const userTypeOptions = tiposUsuario.map((tipo) => ({
    value: tipo.cod_tipo_usuario.toString(),
    label: tipo.descripcion,
  }));


   const documentTypeOptions = tiposDocumento.map((tipo) => ({
    value: tipo.cod_tipo_documento.toString(),
    label: tipo.nombre,
  }));

  useEffect(() => {
  if (userTypeValue === "1") {
    setValue("documentType", "1");
  } else if (userTypeValue && userTypeValue !== "1") {
    setValue("documentType", "2");
  }
}, [userTypeValue, setValue]);

useEffect(() => {
  const subscription = watch(() => {
    if (errorRegister) setErrorRegister(null);
  });
  return () => subscription.unsubscribe();
}, [watch, errorRegister]);


const getDocumentLabel = (value: string) => {
  if (value === "1") return "DNI";
  if (value === "2") return "RUC";
  return "Documento";
};


  const onSubmit = async (data: RegisterFormData) => {
    const newData = {
      tipoUsuario: Number(data.userType),
      correo: data.email,
      contraseña: data.password,
      nombre: data.name,
      apellido: data.lastname?.trim() || null,
      razon_social: data.razonSocial?.trim() || null,
      tipoDocumento: Number(data.documentType),
      nroDocumento: data.document,
      telefono: data.telephone,
      telefono_movil: null,
    };

    await registerUser(newData, (res) => {
      if (res.success) {
          setModal(false)
          setMode('login');
          setModeLogin('login_one');
          setMenuOpen(false);
      }else {
        setErrorRegister(res?.message || "erorr inesperado");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full pt-10 h-full">
      <h2 className="text-2xl font-bold text-gray-800">Regístrate</h2>
      <div className="!w-full flex flex-col gap-1">
        <div className=" cursor-pointer text-gray-700 hover:underline !w-[60px] gap-2 flex items-center" onClick={switchToLogin}>
            <FaArrowLeft className="text-sm"/>
            <span className="w-auto">Atrás</span>
        </div>
        <p className="w-full text-gray-700 text-base leading-5 text-start font-bold">
          Ingresa los datos para crear tu perfil profesional
        </p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Tipo de Usuario */}
        <div className="flex flex-col gap-0">
          <p className={`${isDisabled ? 'flex' : 'hidden'} text-gray-700 text-start text-sm`}>Tipo de usuario</p>
          <Controller
            name="userType"
            control={control}
            render={({ field }) => (
              <CustomSelected
                {...field}
                label="Tipo de usuario"
                fullWidth
                size="md"
                fontSize="14px"
                error={!!errors.userType}
                helperText={errors.userType?.message}
                options={userTypeOptions}
              />
            )}
          />
        </div>

        {/* Correo */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Correo electrónico"
              type="email"
              fullWidth
              placeholder="Ingrese su correo electrónico"
              size="md"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isDisabled}
            />
          )}
        />

        {/* Contraseña */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Contraseña"
              type="password"
              fullWidth
              placeholder="Ingrese su contraseña"
              size="md"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isDisabled}
            />
          )}
        />

        <div className="w-full flex flex-col gap-4">
          <h2 className="text-gray-700 text-start font-bold">Datos personales</h2>
          {/* Nombre */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Nombre"
                type="text"
                fullWidth
                placeholder="Ingrese su nombre"
                size="md"
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isDisabled}
              />
            )}
          />
          {documentTypeValue === "2" ? (
            <Controller
              name="razonSocial"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Razón social"
                  type="text"
                  fullWidth
                  placeholder="Ingrese la razón social"
                  size="md"
                  error={!!errors.razonSocial}
                  helperText={errors.razonSocial?.message}
                  disabled={isDisabled}
                />
              )}
            />
          ) : (
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Apellido"
                  type="text"
                  fullWidth
                  placeholder="Ingrese su apellido"
                  size="md"
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                  disabled={isDisabled}
                />
              )}
            />
          )}


        </div>

        <div className="w-full flex flex-col gap-4">
          <h2 className="text-gray-700 text-start font-bold">Condición fiscal</h2>
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <CustomSelected
                {...field}
                label="Tipo de documento"
                fullWidth
                size="md"
                fontSize="14px"
                error={!!errors.documentType}
                helperText={errors.documentType?.message}
                options={documentTypeOptions}
                disabled={isDisabled}
              />
            )}
          />
          <Controller
            name="document"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label={getDocumentLabel(documentTypeValue)}
                value={field.value ?? ""}
                type="text"
                fullWidth
                placeholder={`Ingrese su ${getDocumentLabel(documentTypeValue)}`}
                size="md"
                error={!!errors.document}
                helperText={errors.document?.message}
                disabled={isDisabled}
              />
            )}
          />
          <Controller
            name="telephone"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Teléfono"
                type="text"
                fullWidth
                placeholder="Ingrese su nombre"
                size="md"
                error={!!errors.telephone}
                helperText={errors.telephone?.message}
                disabled={isDisabled}
              />
            )}
          />
        </div>

        {/* Botón de registro */}
        <CustomButton
          type="submit"
          text="Registrarse"
          fullWidth
          size="md"
          variant="primary"
          fontSize="14px"
          fontWeight={600}
          disabled={!isValid}
        />
        <p className={`${errorRegister ? '' : 'hidden'} w-full text-red-800 text-sm`}>{errorRegister}</p>
      </form>

      <div className="w-full flex flex-col gap-0 items-center justify-center pb-10">
        <p className="w-full text-gray-800 leading-5 text-sm">
          ¿Ya tienes una cuenta?{" "}
        </p>
        <CustomLink
          text="Inicia sesión aquí"
          variant="primary"
          onClick={switchToLogin}
          fontSize="14px"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
