/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import TabSelector from "./components/TabSelector";
import { CustomSelected } from "../../../../../../ui/CustomSelected";
import { CustomButton } from "../../../../../../ui/CustomButton";
import { useAppState } from "../../../../../../../hooks/useAppState";
import { useInmueble } from "../../../../../../../hooks/useInmueble";
import type { RegisterInmueble, SubtipoInmueble, TipoInmueble } from "../../../../../../../interfaces/inmueble";
import { useNotification } from "../../../../../../../hooks/useNotificacionHooks/useNotification";
import { CustomModalConfirm } from "../../../../../../ui/CustomModalConfirm";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  tipo: z.string().nonempty("El tipo de inmueble es obligatorio"),
  subtipo: z.string().nonempty("El subtipo de inmueble es obligatorio"),
});

type FormData = z.infer<typeof schema>;

const OperacionYPropiedad = () => {
  const [operacion, setOperacion] = useState<number | null>(null);
  const { user, newInmueble,setNewInmueble } = useAppState();
  const { getTiposInmueble, getSubtiposInmueble, registrarInmueble } = useInmueble();
  const [tipoInmuebleOptions, setTipoInmuebleOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [subtipoInmuebles, setSubtipoInmuebles] = useState<SubtipoInmueble[]>([]);
  const {showMessage} = useNotification();
  const [openConfirmModal,setOpenConfirmModal] = useState<boolean>();
  const [isLoading,setIsLoading] = useState<boolean>();

  const navigate = useNavigate();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    // trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo: "",
      subtipo: "",
    },
  });

  const tipoSeleccionado = watch("tipo");

  useEffect(() => {
    getTiposInmueble((data) => {
      const formatted = data.map((tipo: TipoInmueble) => ({
        label: tipo.nombre,
        value: tipo.cod_tipo_inmueble,
      }));
      setTipoInmuebleOptions(formatted);
    });
    getSubtiposInmueble((data) => {
      setSubtipoInmuebles(data);
    });
  }, []);


  const subtipoOptions = subtipoInmuebles
  .filter((subtipo) => String(subtipo.cod_tipo_inmueble) === String(tipoSeleccionado))
  .map((subtipo) => ({
    label: subtipo.nombre,
    value: String(subtipo.cod_subtipo_inmueble),
  }));

  const onSubmit = (data: FormData) => {
     setNewInmueble({
      ...newInmueble,
      cod_usuario:String(user?.cod_usuario),
      cod_tipo_inmueble: Number(data.tipo),
      cod_subtipo_inmueble: Number(data.subtipo),
      cod_estado_inmueble: 1,
      operaciones: [Number(operacion)],
    })
    console.log("Datos enviados:", {
      operacion,
      ...data,
    });
  };

  const handleClickGuardarYSalir = () => {
    const data = getValues();
    const isOperacionValid = Boolean(operacion);
    const isTipoValid = Boolean(data.tipo);
    const isSubtipoValid = Boolean(data.subtipo);

    if (!isOperacionValid || !isTipoValid || !isSubtipoValid) {
      showMessage("Completa los campos obligatorios antes de continuar", "error");
      return;
    }
    setOpenConfirmModal(true);
  };

  const handleConfirmGuardarYSalir = async () => {
    const data = getValues();
    const payload: RegisterInmueble = {
      cod_inmueble: "",
      titulo: null,
      descripcion: null,
      cod_tipo_inmueble: Number(data.tipo),
      cod_subtipo_inmueble: Number(data.subtipo),
      cod_ubigeo: null,
      cod_estado_inmueble: 1,
      operaciones: [Number(operacion)],
      caracteristicas: null,
      generales: null,
      amoblamientos: null,
      multimedias: null,
      precios: null,
    };

    setIsLoading(true);
    registrarInmueble(payload, (success) => {
      setIsLoading(false);
      setOpenConfirmModal(false);
      if (success) {
        showMessage("Inmueble guardado como borrador", "success");
        setNewInmueble(ResetInmueble());
        navigate("/panel/avisos");
      } else {
        showMessage("Error al registrar inmueble como borrador", "error");
      }
    });
  };

  const ResetInmueble=()=>{
    return {
      cod_inmueble:"",
      cod_usuario:"",
      titulo:null,
      descripcion:null,
      cod_tipo_inmueble:0,
      cod_subtipo_inmueble:0,
      cod_ubigeo:null,
      cod_estado_inmueble:0,
      operaciones:[],
      caracteristicas:null,
      generales:null,
      amoblamientos:null,
      multimedias:null,
      precios:null
    }
  }

  return (
    <>
      <div className="w-full text-gray-800 max-w-[800px]">
        <h3 className="text-lg font-bold mb-4">
          ¡Hola {user?.nombre}, empecemos a crear tu aviso!
        </h3>

        <div className="w-full p-4 bg-white rounded-lg shadow-md flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-xl font-semibold">¿Qué quieres publicar?</h4>
            <p className="text-sm text-gray-600">
              Selecciona la operación que deseas publicar.
            </p>
            <TabSelector selected={operacion} onSelect={setOperacion} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full gap-6 flex flex-col"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="w-full flex flex-col gap-3">
                <label className="block text-sm font-medium">
                  Tipo de inmueble
                </label>
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
                        setValue("subtipo", "");
                      }}
                      size="md"
                    />
                  )}
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                <label className="block text-sm font-medium">
                  Subtipo de inmueble
                </label>
                <Controller
                  name="subtipo"
                  control={control}
                  render={({ field }) => (
                    <CustomSelected
                      {...field}
                      options={subtipoOptions}
                      label="Selecciona el subtipo de inmueble"
                      fullWidth
                      disabled={!tipoSeleccionado}
                      error={!!errors.subtipo}
                      helperText={errors.subtipo?.message}
                      size="md"
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-row gap-4 items-center justify-end">
              <CustomButton
                type="button"
                variant="primary-outline"
                size="md"
                fontSize="14px"
                fontWeight={600}
                text="Guardar y Salir"
                onClick={handleClickGuardarYSalir}
              />
              <CustomButton
                type="submit"
                variant="primary"
                size="md"
                fontSize="14px"
                fontWeight={600}
                text="Continuar"
              />
            </div>
          </form>
        </div>
      </div>
      <CustomModalConfirm
        isOpen={Boolean(openConfirmModal)}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={handleConfirmGuardarYSalir}
        title="¿Deseas continuar?"
        message="Se guardará tus datos de inmueble."
        loading={isLoading}
      />
    </>
  );
};

export default OperacionYPropiedad;
