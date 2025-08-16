import { useMemo } from "react";
import { FaInbox } from "react-icons/fa";
import { CustomChip } from "../../../ui/CustomChip";
import { useAppState } from "../../../../hooks/useAppState";

const backgroundColor = "#F5FBF9";

const FilterAviso = () => {
  const { listaAvisos,setFiltroAvisos,setIsArchivado,isArchivado, setSeleccionadosAvisos } = useAppState();

  const limpiarFiltros = () => {
    setIsArchivado(false);
    setFiltroAvisos(listaAvisos.avisos);
  };

  // Agrupar tipos de inmueble y operaciones
    const { tiposInmueble, tiposOperacion } = useMemo(() => {
    const tipoInmuebleMap = new Map<string, number>();
    const tipoOperacionMap = new Map<string, number>();

    // Filtramos los que NO están archivados
    const avisosNoArchivados = listaAvisos?.avisos?.filter(av => !av.isArchivado) || [];

    avisosNoArchivados.forEach((aviso) => {
      aviso.sub_tipo_propiedad?.forEach((sub) => {
        const key = sub.tipo_inmueble_nombre;
        tipoInmuebleMap.set(key, (tipoInmuebleMap.get(key) || 0) + 1);
      });

      aviso.tipo_operacion?.forEach((op) => {
        const key = op.nombre;
        tipoOperacionMap.set(key, (tipoOperacionMap.get(key) || 0) + 1);
      });
    });

    return {
      tiposInmueble: Array.from(tipoInmuebleMap.entries()),
      tiposOperacion: Array.from(tipoOperacionMap.entries())
    };
  }, [listaAvisos]);


  return (
    <div
    // lg:max-w-full md:max-w-[280px]
      className="w-full md:max-w-[280px] md:min-w-[280px] p-4 rounded-2xl border border-gray-200 shadow-md transition-all duration-300"
      style={{ backgroundColor }}
    >
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          Filtros
        </h2>
        {isArchivado && (
          <button
            onClick={limpiarFiltros}
            className="text-sm text-primary hover:underline transition duration-200 font-medium hover:cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Chip activo */}
      <div
        className={`transition-all duration-300 ${
          isArchivado ? "opacity-100 mb-4 scale-100" : "opacity-0 h-0 mb-0 scale-95"
        } overflow-hidden`}
      >
        {isArchivado && (
          <CustomChip
            label="Archivado"
            onDelete={limpiarFiltros}
            variant="primary-outline"
            selected
          />
        )}
      </div>

      {/* Tipos de inmueble */}
      {!isArchivado && tiposInmueble.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Tipo de inmueble
          </p>
          {tiposInmueble.map(([nombre, count]) => (
            <div
              key={nombre}
              onClick={() => {
                const filtrados = listaAvisos.avisos
                  .filter(av => !av.isArchivado) // excluye archivados
                  .filter(av =>
                    av.sub_tipo_propiedad.some(
                      (sub) => sub.tipo_inmueble_nombre === nombre
                    )
                  );
                setFiltroAvisos(filtrados);
                setSeleccionadosAvisos([]);
              }}
              className="cursor-pointer hover:text-green-700 text-sm text-gray-800 py-1"
            >
              {nombre} <span className="text-gray-500">({count})</span>
            </div>

          ))}
        </div>
      )}

      {/* Tipos de operación */}
      {!isArchivado && tiposOperacion.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Tipo de operación
          </p>
          {tiposOperacion.map(([nombre, count]) => (
            <div
              key={nombre}
              onClick={() => {
                const filtrados = listaAvisos.avisos
                .filter(av => !av.isArchivado) // excluye archivados
                .filter(av =>
                  av.tipo_operacion.some(
                    (op) => op.nombre === nombre
                  )
                );
              setFiltroAvisos(filtrados);
              setSeleccionadosAvisos([]);
              }}
              className="cursor-pointer hover:text-green-700 text-sm text-gray-800 py-1"
            >
              {nombre} <span className="text-gray-500">({count})</span>
            </div>
          ))}
        </div>
      )}

      {/* Opción bandeja archivado */}
      <div
        onClick={() => {
          setIsArchivado(true);
          const archivados = listaAvisos.avisos.filter(
            (av) => av.isArchivado === true
          );
          setFiltroAvisos(archivados);
        }}
        className="flex items-center gap-3 text-gray-700 hover:bg-white px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group border border-transparent hover:border-green-200"
      >
        <div className="bg-green-100 text-text-primary p-2 rounded-full group-hover:bg-green-200 transition duration-200">
          <FaInbox size={18} />
        </div>
        <span className="text-sm font-medium group-hover:text-green-900">
          Bandeja de Archivados
        </span>
      </div>

      

    </div>
  );
};

export default FilterAviso;

