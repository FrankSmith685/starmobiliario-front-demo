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
} from "react-icons/fa";

export type SectionType = "top" | "middle" | "bottom";

export interface UserMenuItem {
  section: SectionType;
  label: string;
  icon: IconType;
  isLogout?: boolean;
}

export const userMenuItemsData: UserMenuItem[] = [
  {
    section: "top",
    label: "Mis contactos",
    icon: FaUserFriends,
  },
  {
    section: "top",
    label: "Favoritos",
    icon: FaHeart,
  },
  {
    section: "top",
    label: "Búsquedas y alertas",
    icon: FaBell,
  },
  {
    section: "top",
    label: "Historial",
    icon: FaEye,
  },
  {
    section: "middle",
    label: "Mi cuenta",
    icon: FaUser,
  },
  {
    section: "middle",
    label: "Ajustes de notificaciones",
    icon: FaCog,
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
