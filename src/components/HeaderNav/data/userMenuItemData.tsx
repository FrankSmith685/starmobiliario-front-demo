import type { IconType } from "react-icons";
import {
  FaUserFriends,
  FaHeart,
  FaBell,
  FaEye,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaUsers,
  FaFileContract,
} from "react-icons/fa";

export type SectionType = "top" | "middle" | "bottom";

export interface UserMenuItem {
  section: SectionType;
  label: string;
  icon: IconType;
  isLogout?: boolean;
  isActive?: boolean;
  path?: string;
}

export const userMenuItemsData: UserMenuItem[] = [
  {
    section: "top",
    label: "Mis contactos",
    icon: FaUserFriends,
    isActive: true,
    path: "/panel/actividad/contactos",
  },
  {
    section: "top",
    label: "Favoritos",
    icon: FaHeart,
    isActive: true,
    path: "/panel/actividad/favoritos",
  },
  {
    section: "top",
    label: "Búsquedas y alertas",
    icon: FaBell,
    isActive: true,
    path: "/panel/actividad/busquedas-alertas",
  },
  {
    section: "top",
    label: "Historial",
    icon: FaEye,
    isActive: true,
    path: "/panel/actividad/historial",
  },
  {
    section: "top",
    label: "Mis Avisos",
    icon: FaClipboardList,
    isActive: false,
    path: "/panel/avisos",
  },
  {
    section: "top",
    label: "Interesados",
    icon: FaUsers,
    isActive: false,
    path: "/panel/interesados",
  },
  {
    section: "top",
    label: "Mi Actividad",
    icon: FaEye,
    isActive: false,
    path: "/panel/actividad",
  },
  {
    section: "top",
    label: "Contrataciones",
    icon: FaFileContract,
    isActive: false,
    path: "/panel/contrataciones",
  },
  {
    section: "middle",
    label: "Mi cuenta",
    icon: FaUser,
    path: "/panel/cuenta",
  },
  {
    section: "middle",
    label: "Ajustes de notificaciones",
    icon: FaCog,
    path: "/panel/cuenta/notificaciones",
  },
  {
    section: "bottom",
    label: "Ayuda",
    icon: FaQuestionCircle,
  },
  {
    section: "bottom",
    label: "Cerrar sesión",
    icon: FaSignOutAlt,
    isLogout: true,
  },
];
