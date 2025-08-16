/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { CustomCheckbox } from "../../../ui/CustomCheckbox";
import { CustomInput } from "../../../ui/CustomInput";
import { CustomSelected } from "../../../ui/CustomSelected";
import { useAppState } from "../../../../hooks/useAppState";
import { FaArchive, FaUndo } from "react-icons/fa";
import { useAvisos } from "../../../../hooks/useAvisos";
import { useNotification } from "../../../../hooks/useNotificacionHooks/useNotification";
import { CustomModalConfirm } from "../../../ui/CustomModalConfirm";
// import { useNotification } from "../../../../hooks/useNotification";

type SortOption =
  | "Modificados recientes"
  | "Modificados antiguos"
  | "Creados recientes"
  | "Creados antiguos"
  | "Menor precio"
  | "Mayor precio"
  | "Menor calidad"
  | "Mayor calidad";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "Modificados recientes", label: "Modificados recientes" },
  { value: "Modificados antiguos", label: "Modificados antiguos" },
  { value: "Creados recientes", label: "Creados recientes" },
  { value: "Creados antiguos", label: "Creados antiguos" },
  { value: "Menor precio", label: "Menor precio" },
  { value: "Mayor precio", label: "Mayor precio" },
  { value: "Menor calidad", label: "Menor calidad" },
  { value: "Mayor calidad", label: "Mayor calidad" },
];

const backgroundColor = "#F5FBF9";

const NoResultsHeader: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("Modificados recientes");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);

  const [openConfirmModal, setOpenConfirmModal] = useState<null | 'archive' | 'restore'>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setFiltroAvisos,filtroAvisos,setListaAvisos, listaAvisos,isArchivado, seleccionadosAvisos,setSeleccionadosAvisos } = useAppState();
  const { archivarAvisos, restaurarAvisos } = useAvisos();

  const { showMessage } = useNotification();


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent<string | number>) => {
    setSort(e.target.value as SortOption);
  };

  const handleHeaderCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckboxChecked(checked);

    if (checked) {
      const avisosASeleccionar = filtroAvisos; 
      setSeleccionadosAvisos(avisosASeleccionar);
    } else {
      // Limpiar selección
      setSeleccionadosAvisos([]);
    }
  };


 // Abre el modal para confirmar la acción
  const handleClickArchiveRestore = () => {
    if (seleccionadosAvisos.length === 0) return; // nada que hacer
    setOpenConfirmModal(isArchivado ? "restore" : "archive");
  };

  // Función que se llama cuando confirmas en el modal
  const handleConfirmAction = async () => {
    if (!openConfirmModal) return;

    setIsLoading(true);

    const codAvisos = seleccionadosAvisos.map(av => av.cod_aviso);

    try {
      let result;
      if (openConfirmModal === "archive") {
        result = await archivarAvisos(codAvisos);
      } else {
        result = await restaurarAvisos(codAvisos);
      }

      if (result?.success) {
        // Actualizar lista local
        const avisosActualizados = listaAvisos.avisos.map(av =>
          codAvisos.includes(av.cod_aviso)
            ? { ...av, isArchivado: openConfirmModal === "archive" }
            : av
        );

        setListaAvisos({
          ...listaAvisos,
          avisos: avisosActualizados,
        });
        setSeleccionadosAvisos([]);
        setCheckboxChecked(false);

        // Mostrar mensaje éxito
        showMessage(
          openConfirmModal === "archive"
            ? "Avisos archivados correctamente."
            : "Avisos restaurados correctamente.",
          "success"
        );
      } else {
        showMessage(result?.message || "Error en la operación", "error");
      }
    } catch (error: any) {
      showMessage(error.message || "Error inesperado", "error");
    } finally {
      setIsLoading(false);
      setOpenConfirmModal(null);
    }
  };

useEffect(() => {
  // Si todos los avisos filtrados están seleccionados, marcar checkbox
  const todosSeleccionados = filtroAvisos.length > 0 && filtroAvisos.every(av => 
    seleccionadosAvisos.some(sel => sel.cod_aviso === av.cod_aviso)
  );

  setCheckboxChecked(todosSeleccionados);
}, [seleccionadosAvisos, filtroAvisos]);





useEffect(() => {
  const searchTerm = search.trim().toLowerCase();

  let filtrados = listaAvisos.avisos.filter((aviso) => {
    if (isArchivado && !aviso.isArchivado) return false;
    if (!isArchivado && aviso.isArchivado) return false;

    const texto = `${aviso.cod_aviso} ${aviso.cod_inmueble} ${aviso.titulo} ${aviso.direccion}`.toLowerCase();
    const coincideBusqueda = texto.includes(searchTerm);
    const coincideEstado = checkboxChecked ? aviso.estado === "Incompleto" : true;

    return coincideBusqueda && coincideEstado;
  });

  // Ordenamiento
  filtrados = filtrados.sort((a, b) => {
    const fechaA = new Date(a.fecha_actualizacion);
    const fechaB = new Date(b.fecha_actualizacion);
    const creadoA = new Date(a.fecha_creacion);
    const creadoB = new Date(b.fecha_creacion);

    switch (sort) {
      case "Modificados recientes":
        return fechaB.getTime() - fechaA.getTime();
      case "Modificados antiguos":
        return fechaA.getTime() - fechaB.getTime();
      case "Creados recientes":
        return creadoB.getTime() - creadoA.getTime();
      case "Creados antiguos":
        return creadoA.getTime() - creadoB.getTime();
      case "Mayor precio":
        return Number(b.precio) - Number(a.precio);
      case "Menor precio":
        return Number(a.precio) - Number(b.precio);
      case "Mayor calidad":
        return (b.calidad_score ?? 0) - (a.calidad_score ?? 0);
      case "Menor calidad":
        return (a.calidad_score ?? 0) - (b.calidad_score ?? 0);
      default:
        return 0;
    }
  });

  setFiltroAvisos(filtrados);
}, [search, sort, checkboxChecked, listaAvisos.avisos, isArchivado]);

  const hayAvisosNoArchivados = listaAvisos.avisos.some(av => !av.isArchivado);
const hayAvisosArchivados = listaAvisos.avisos.some(av => av.isArchivado);

  return (
    <>
      <div
        className="rounded-2xl shadow-md border border-gray-200 transition-all duration-300"
        style={{ backgroundColor }}
      >
        <div className="p-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
          {/* Checkbox */}
          <div className="flex items-center gap-0 w-full md:w-auto">
            <CustomCheckbox
              label={
                seleccionadosAvisos.length > 0
                  ? `Se seleccionaron ${seleccionadosAvisos.length} ${isArchivado ? "avisos archivados" : "avisos"}`
                  : `Se encontraron ${
                      !isArchivado
                        ? filtroAvisos.filter(av => !av.isArchivado).length + " avisos"
                        : listaAvisos.avisos.filter(av => av.isArchivado).length + " avisos archivados"
                    }`
              }
              checked={checkboxChecked}
              onChange={handleHeaderCheckbox}
              variant="primary"
              fontSize="14px"
              size="md"
            />

            {seleccionadosAvisos.length > 0 && (
              <button
                onClick={handleClickArchiveRestore}
                className={`flex items-center gap-2 
                  ${(!isArchivado && !hayAvisosNoArchivados) || (isArchivado && !hayAvisosArchivados) ? 'hidden' : 'flex'}
                  ${!isArchivado ? 'bg-primary hover:bg-green-900' : 'bg-yellow-600 hover:bg-yellow-700'}
                  text-white px-3 py-1 rounded-lg transition`}
              >
                {!isArchivado ? <FaArchive /> : <FaUndo />}
                <p className="lg:hidden text-white">
                  {!isArchivado ? 'Archivar' : 'Restaurar'}
                </p>
              </button>
            )}

          </div>

          {/* Search input */}
          <div className="w-full md:flex-1 min-w-0">
            <CustomInput
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Código / ID / Título / Dirección"
              type="search"
              fullWidth
              variant="primary"
              size="md"
              ariaLabel="Buscar avisos"
              icon={null}
              label={undefined}
              error={false}
            />
          </div>

          {/* Select ordenamiento */}
          <div className="w-full md:w-auto">
            <CustomSelected
              value={sort}
              onChange={handleSortChange}
              options={sortOptions}
              label="Ordenar por"
              variant="primary"
              fullWidth={true}
              size="md"
            />
          </div>
        </div>
      </div>
    
      <CustomModalConfirm
        isOpen={Boolean(openConfirmModal)}
        onClose={() => setOpenConfirmModal(null)}
        onConfirm={handleConfirmAction}
        title={openConfirmModal === "archive" ? "Confirmar archivado" : "Confirmar restauración"}
        message={
          openConfirmModal === "archive"
            ? "¿Deseas archivar los avisos seleccionados?"
            : "¿Deseas restaurar los avisos seleccionados?"
        }
        loading={isLoading}
      />
    </>
  );
};

export default NoResultsHeader;
