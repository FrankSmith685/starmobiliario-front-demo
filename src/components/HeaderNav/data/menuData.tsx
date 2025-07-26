import {
  FaHeart,
  FaBell,
  FaEye,
  FaUserFriends,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
  FaClipboardList,
  FaUsers,
  FaFileContract,
} from "react-icons/fa";
import type { MenuItem, QuickAccessItem } from "../../../interfaces/menuHeaderInterface";


export const quickAccess: QuickAccessItem[] = [
  { label: "Mis contactos", icon: FaUserFriends, isActive: true,path: "/panel/actividad/contactos" },
  { label: "Favoritos", icon: FaHeart , isActive: true, path: "/panel/actividad/favoritos" },
  { label: "Búsquedas y alertas", icon: FaBell , isActive: true, path: "/panel/actividad/busquedas-alertas" },
  { label: "Historial", icon: FaEye , isActive: true, path: "/panel/actividad/historial" },
  { label: "Mis Avisos", icon: FaClipboardList, isActive: false, path: "/panel/avisos" },
  { label: "Interesados", icon: FaUsers, isActive: false, path: "/panel/interesados" },
  { label: "Mi Actividad", icon: FaEye, isActive: false, path: "/panel/actividad" },
  { label: "Contrataciones", icon: FaFileContract, isActive: false,path: "/panel/contrataciones" },
  { label: "Mi cuenta", icon: FaUser, path: "/panel/cuenta" },
  { label: "Ajustes de notificaciones",icon: FaCog, path: "/panel/cuenta/notificaciones" },
  { label: "Ayudar",icon: FaQuestionCircle},
  { label: "Cerrar sesión",icon: FaSignOutAlt,isLogout: true, },
];


export const menuData:MenuItem[] = [
  {
    label: "Comprar",
    hasSubmenu: true,
    megaMenu: true,
    columns: [
      {
        title: "Estado",
        items: ["Lima", "Piura", "Callao", "Ica", "Lambayeque", "La Libertad", "Arequipa", "Cusco", "Tumbés", "Junín", "Ancash"],
      },
      {
        title: "Tipo de propiedad",
        items: ["Departamento", "Casa", "Terreno / Lote", "Oficina", "Local Comercial"],
      },
      {
        title: "Dormitorios",
        items: ["1 dormitorio", "2 dormitorios", "3 dormitorios", "4 dormitorios", "5 o más dormitorios"],
      },
      {
        title: "Servicios",
        items: ["Guía para comprar un inmueble", "Publica un inmueble para venta"],
      },
      {
        title: "Otras operaciones",
        items: ["Proyectos"],
      },
    ],
  },
  {
    label: "Alquilar",
    hasSubmenu: true,
    tabs: [
      {
        title: "Alquilar",
        columns: [
          {
            title: "Estado",
            items: ["Lima", "Piura", "Callao", "Ica", "Lambayeque", "La Libertad", "Arequipa", "Cusco", "Tumbés", "Junín", "Ancash"],
          },
          {
            title: "Tipo de propiedad",
            items: ["Departamento", "Casa", "Terreno / Lote", "Oficina", "Local Comercial"],
          },
          {
            title: "Dormitorios",
            items: ["1 dormitorio", "2 dormitorios", "3 dormitorios", "4 dormitorios", "5 o más dormitorios"],
          },
          {
            title: "Servicios",
            items: ["Guía para alquilar un inmueble", "Publica un inmueble para alquilar"],
          },
        ],
      },
      {
        title: "Temporal",
        columns: [
          {
            title: "Estado",
            items: ["Lima", "Piura", "Cusco", "Ica", "Arequipa", "Moquegua", "Tumbes"],
          },
          {
            title: "Tipo de propiedad",
            items: ["Departamento", "Casa", "Habitación"],
          },
          {
            title: "Dormitorios",
            items: ["1 dormitorio", "2 dormitorios", "3 dormitorios", "4 dormitorios", "5 o más dormitorios"],
          },
        ],
      },
    ],
  },
  {
    label: "Servicios",
    hasSubmenu: true,
    megaMenu: true,
    columns: [
      {
        title: "Otros servicios",
        items: ["Publica un inmueble"],
      },
      {
        title: "Starmobiliario te explica",
        items: ["Guía para comprar un inmueble", "Guía para vender un inmueble", "Tips de decoración"],
      },
      {
        title: "Números del mercado",
        items: ["Reporte Índice por m2"],
      },
      {
        title: "Mercados",
        items: ["Mercado Inmobiliario"],
      },
    ],
  },
  {
    label: "Proyectos",
    hasSubmenu: false,
  },
  {
    label: "Amoblamientos",
    hasSubmenu: false,
  },
];

