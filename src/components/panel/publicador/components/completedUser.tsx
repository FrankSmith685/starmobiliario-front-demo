/* eslint-disable react-hooks/exhaustive-deps */
// src/components/panel/publicador/FormularioContactoModal.tsx
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "../../../ui/CustomModal";
import { CustomInput } from "../../../ui/CustomInput";
import { CustomSelected } from "../../../ui/CustomSelected";
import { CustomButton } from "../../../ui/CustomButton";
import { useDocument } from "../../../../hooks/useDocument";
import type { TypeDocument } from "../../../../interfaces/document";
import type { UpdateUsuarioCompleto } from "../../../../interfaces/user";
import { useAppState } from "../../../../hooks/useAppState";
import { useUser } from "../../../../hooks/useUser";
import { useNotification } from "../../../../hooks/useNotificacionHooks/useNotification";


const schema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  lastname: z.string().nonempty("El apellido es obligatorio"),
  documentType: z.string().nonempty("La condición es obligatoria"),
  document: z
    .string()
    .nonempty("El documento es obligatorio")
    .regex(/^\d+$/, "Solo se permiten números"),
  telephone: z
    .string()
    .nonempty("El teléfono móvil es obligatorio")
    .regex(/^\d+$/, "Solo se permiten números")
    .min(6, "Demasiado corto")
    .max(15, "Demasiado largo"),
  telephoneOptional: z.string().optional(),
});

export type FormData = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const CompletedUser: React.FC<Props> = ({ isOpen, onClose,onSuccess }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
        name: '',
        lastname: '',
        documentType: '',
        document: '',
        telephone: '',
        telephoneOptional: '',
    },
  });
  const {getAllDocumentTypes} = useDocument();
  const [tiposDocumento, setTiposDocumento] = useState<TypeDocument[]>([]);
  const {user} = useAppState();
  const {updateUser} = useUser();
  const {showMessage} = useNotification();
  const [isLoading,setIsLoading] = useState(false);

   useEffect(() => {
      getAllDocumentTypes((tipos) => {
        setTiposDocumento(tipos);
      });
    }, []);
    const documentTypeOptions = tiposDocumento.map((tipo) => ({
    value: tipo.cod_tipo_documento?.toString(),
    label: tipo.nombre,
  }));
  useEffect(() => {
    if (user) {
      reset({
        name: user.nombre || "",
        lastname: user.apellido || "",
        documentType: user.documento?.tipo_documento?.toString() || "",
        document: user.documento?.nro_documento || "",
        telephone: user.telefono || "",
        telephoneOptional: user.telefono_movil || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
    const payload: UpdateUsuarioCompleto = {
        cod_usuario: user?.cod_usuario,
        nombre: data.name,
        apellido: data.lastname,
        telefono: data.telephoneOptional,
        telefono_movil: data.telephone,
        documento: {
            cod_tipo_documento: Number(data.documentType),
            nro_documento: data.document
        }
    };

    setIsLoading(true);

    updateUser(payload, (updatedUser,message) => {
        reset({
        name: updatedUser.nombre || "",
        lastname: updatedUser.apellido || "",
        documentType: updatedUser.documento?.tipo_documento?.toString() || "",
        document: updatedUser.documento?.nro_documento || "",
        telephone: updatedUser.telefono || "",
        telephoneOptional: updatedUser.telefono_movil || "",
        });
        showMessage( message ?? "Datos actualizados correctamente", "success");
        setIsLoading(false);
        onSuccess();
    });
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} width="550px" height="auto" closable={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full" noValidate>
        <h2 className="text-xl font-bold text-center">Completa el formulario</h2>
        <p className="text-sm text-gray-600 text-center">
          Datos de facturación y de contacto, para que los interesados puedan realizarte consultas por tu aviso
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} size="md" label="Nombre" placeholder="Ingresa un nombre" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} size="md" label="Apellido" placeholder="Ingresa un apellido" error={!!errors.lastname} helperText={errors.lastname?.message} />
            )}
          />
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <CustomSelected
                {...field}
                label="Condición"
                size="md"
                options={documentTypeOptions}
                error={!!errors.documentType}
                helperText={errors.documentType?.message}
              />
            )}
          />
          <Controller
            name="document"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} size="md" label="Documento" placeholder="Ingresa un documento" error={!!errors.document} helperText={errors.document?.message} />
            )}
          />
          <Controller
            name="telephone"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Teléfono móvil"
                size="md"
                placeholder="Ingresa un número de teléfono móvil"
                error={!!errors.telephone}
                helperText={errors.telephone?.message}
              />
            )}
          />
          <Controller
            name="telephoneOptional"
            control={control}
            render={({ field }) => (
              <CustomInput {...field} size="md" label="Teléfono (opcional)" placeholder="Ingresa un número de teléfono" />
            )}
          />
        </div>

        <div className="flex justify-center">
          <CustomButton type="submit" size="md" text="Continuar" variant="primary" fontWeight={600} loading={isLoading}/>
        </div>
      </form>
    </CustomModal>
  );
};

export default CompletedUser;
