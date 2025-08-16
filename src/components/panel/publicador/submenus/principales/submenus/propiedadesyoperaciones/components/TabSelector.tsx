/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useInmueble } from "../../../../../../../../hooks/useInmueble";
import type { Operacion } from "../../../../../../../../interfaces/inmueble";

interface TabSelectorProps {
  selected: number | null;
  onSelect: (value: number) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ selected, onSelect }) => {
  const { getOperaciones } = useInmueble();
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);

  useEffect(() => {
    getOperaciones((data) => {
      setOperaciones(data);
    });
  }, []);

  return (
    <div className="inline-flex rounded-sm border border-gray-300 overflow-hidden shadow-sm bg-white">
      {operaciones.map((operacion, index) => (
        <button
          key={operacion.cod_operacion}
          onClick={() => onSelect(Number(operacion?.cod_operacion))}
          className={`relative px-5 h-[44px] text-sm font-medium transition-all duration-200 hover:cursor-pointer
            ${selected === operacion.cod_operacion
              ? "bg-primary text-white font-semibold"
              : "text-gray-500 hover:bg-primary "}
          `}
        >
          {operacion.nombre}
          {index < operaciones.length - 1 && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-5 bg-gray-300"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
