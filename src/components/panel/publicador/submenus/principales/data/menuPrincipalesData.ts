// src/data/menuCuentaData.ts
import type { IconType } from "react-icons";
import {
  AiOutlineHome,
  AiOutlineEnvironment,
  AiOutlineAppstore,
} from "react-icons/ai";

export interface MenuCuentaItem {
  label: string;
  path: string;
  icon: IconType;
}

export const menuPrincipalesData: MenuCuentaItem[] = [
  {
    label: "Operación y Tipo de inmuebles",
    path: "/panel/publicador/principales/operacionypropiedad",
    icon: AiOutlineHome,
  },
  {
    label: "Ubicación",
    path: "/panel/publicador/principales/ubicacion",
    icon: AiOutlineEnvironment,
  },
  {
    label: "Características",
    path: "/panel/publicador/principales/caracteristicas",
    icon: AiOutlineAppstore,
  },
];
