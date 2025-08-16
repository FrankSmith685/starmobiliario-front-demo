import {
  FaCamera,
  FaChartLine,
  FaRegFrown,
  FaPlayCircle,
  FaEdit,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useAppState } from "../../../../hooks/useAppState";
import dayjs from "dayjs";
import { CustomCheckbox } from "../../../ui/CustomCheckbox";
import type { Aviso } from "../../../../interfaces/avisos";


const backgroundColor = "#F5FBF9";
const ListaAvisos = () => {
  const { filtroAvisos, seleccionadosAvisos, setSeleccionadosAvisos } = useAppState();

  if (!filtroAvisos.length) return null;

  const toggleSeleccion = (aviso: Aviso) => {
    const existe = seleccionadosAvisos.some(a => a.cod_aviso === aviso.cod_aviso);
    if (existe) {
      setSeleccionadosAvisos(seleccionadosAvisos.filter(a => a.cod_aviso !== aviso.cod_aviso));
    } else {
      setSeleccionadosAvisos([...seleccionadosAvisos, aviso]);
    }
  };


  return (
    <div className="space-y-4">
      {filtroAvisos.map((aviso) => {
       const checked = seleccionadosAvisos.some((a) => a.cod_aviso === aviso.cod_aviso);
        return (
          <div key={aviso.cod_aviso} style={{ backgroundColor }} className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center flex-col justify-center gap-0">
              <div className="w-full h-full flex flex-col pb-4 border-b-[1px] border-gray-400 gap-0  lg:bg-transparent">
                <div className="w-full flex flex-col sm:flex-row justify-between pb-4 border-b-[1px] border-gray-400 gap-4 sm:gap-0">
                  <div className="w-full">
                    <div className="flex items-center gap-4">
                      {/* checkbox y imagen */}
                      <CustomCheckbox
                        label=""
                        checked={checked}
                        onChange={() => toggleSeleccion(aviso)}
                        variant="primary"
                        fontSize="14px"
                        size="md"
                      />

                      <div className="w-20 h-20  bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {aviso.imagen ? (
                          <img
                            src={aviso.imagen}
                            alt="inmueble"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaCamera className="text-gray-400 text-3xl" />
                        )}
                      </div>
                      {/* TIpo de inmueble , precio, tipo de operación  */}
                      <div>
                        <p className="text-sm text-gray-500">
                          {aviso.sub_tipo_propiedad?.[0]?.tipo_inmueble_nombre}
                        </p>
                        <h3 className="text-base font-semibold text-gray-800">
                          {aviso.titulo || "Aviso sin título"}
                        </h3>
                        <div className="flex w-full flex-row gap-2">
                          <p className="text-sm text-gray-500">
                            {aviso.tipo_operacion && aviso.tipo_operacion.length > 0
                              ? aviso.tipo_operacion.map(op => op.nombre).join(", ")
                              : "Sin operación"}
                          </p>
                          <span className="font-medium text-gray-700 text-sm">
                            {aviso.precio ? `S/ ${aviso.precio}` : "Sin precio"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto flex items-center justify-center">
                    {/* Diseño para pantallas medianas y grandes */}
                  <div className="w-auto sm:flex flex-col items-center gap-1 hidden">
                    {/* Estado */}
                    <span className="flex items-center justify-center gap-1 text-gray-600 text-[12px]">
                      {aviso.estado}
                    </span>

                    {/* Círculo de progreso */}
                    <div className="w-12 h-12 relative">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          className="text-gray-200"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="24"
                          cy="24"
                        />
                        <circle
                          className="text-gray-500"
                          strokeWidth="3"
                          strokeDasharray={2 * Math.PI * 12}
                          strokeDashoffset={
                            2 * Math.PI * 12 -
                            (aviso.porcentaje / 100) * (2 * Math.PI * 12)
                          }
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="24"
                          cy="24"
                        />
                      </svg>

                      {/* Porcentaje */}
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 font-medium">
                        {aviso.porcentaje > 0 ? `${aviso.porcentaje}%` : "0%"}
                      </span>

                      <FaRegFrown className="text-gray-400 text-sm absolute inset-8 bg-white" />
                    </div>
                  </div>

                  {/* Diseño alternativo para sm hacia abajo */}
                  <div className="w-full flex items-center gap-2 sm:hidden">
                    <span className="text-gray-600 text-xs">{aviso.estado}</span>
                    <span className="ml-auto text-xs text-gray-500">
                      {aviso.porcentaje > 0 ? `${aviso.porcentaje}%` : "0%"}
                    </span>
                  </div>

                  </div>
                </div>
                {/* desempeño */}
                <div className="w-full pt-4 flex flex-col gap-4">
                  <div className="w-full h-auto flex items-center gap-2 rounded">
                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                      <FaChartLine className="text-gray-500 text-lg" />
                      {aviso.desempeno > 0 ? `${aviso.desempeno}%` : "Sin desempeño"}
                    </div>
                    <button
                      className="ml-auto bg-gray-200 text-gray-400 text-sm px-4 py-1 rounded cursor-not-allowed"
                      disabled
                    >
                      Mejorar desempeño
                    </button>
                  </div>
                  <div className="w-full h-full bg-white border border-gray-600 rounded text-xs 
                      flex flex-col divide-y sm:flex-row sm:divide-y-0 sm:divide-x">
                    {/* Exposición */}
                    <div className="flex items-center justify-between sm:flex-col sm:justify-center sm:flex-1 p-2">
                      <span className="text-gray-500">Exposición</span>
                      <span className="text-gray-700 font-medium">-</span>
                    </div>

                    {/* Visualizaciones */}
                    <div className="flex items-center justify-between sm:flex-col sm:justify-center sm:flex-1 p-2">
                      <span className="text-gray-500">Visualizaciones</span>
                      <span className="text-gray-700 font-medium">-</span>
                    </div>

                    {/* Interesados */}
                    <div className="flex items-center justify-between sm:flex-col sm:justify-center sm:flex-1 p-2">
                      <span className="text-gray-500">Interesados</span>
                      <span className="text-gray-700 font-medium flex items-center gap-1">
                        -{" "}
                        <a href="#" className="text-black underline font-medium">
                          Ver consultas
                        </a>
                      </span>
                    </div>
                  </div>

                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row md:flex-col lg:flex-row lg:items-center gap-4 text-xs text-gray-600 pt-4 justify-between">
              <div className="w-full flex flex-wrap gap-2 lg:gap-4 items-center">
                {/* Código */}
                <span>
                  Código <span className="font-semibold">{aviso.cod_inmueble}</span>
                </span>

                {/* Separador */}
                <span className="text-gray-300 hidden sm:inline">|</span>

                {/* ID */}
                <span>
                  ID <span className="font-semibold">{aviso.cod_aviso}</span>
                </span>

                {/* Separador */}
                <span className="text-gray-300 hidden sm:inline">|</span>

                {/* Fecha creación */}
                <span>
                  Creado {dayjs(aviso.fecha_creacion).format("DD/MM/YYYY")}
                </span>
              </div>

              <div className="w-auto flex-1">
                {/* Íconos */}
                <div className="flex items-center gap-3 lg:ml-auto text-lg text-gray-500">
                  <FaPlayCircle className="cursor-pointer hover:text-gray-700" />
                  <FaEdit className="cursor-pointer hover:text-gray-700" />
                  <FaExternalLinkAlt className="cursor-pointer hover:text-gray-700" />
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ListaAvisos;