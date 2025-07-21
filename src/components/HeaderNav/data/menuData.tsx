import {
  FaHeart,
  FaBell,
  FaEye,
  FaUserFriends,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import type { MenuItem, QuickAccessItem } from "../../../interfaces/menuHeaderInterface";


export const quickAccess: QuickAccessItem[] = [
  { label: "Mis contactos", icon: FaUserFriends },
  { label: "Favoritos", icon: FaHeart },
  { label: "Búsquedas y alertas", icon: FaBell },
  { label: "Historial", icon: FaEye },
  { label: "Mi cuenta", icon: FaUser },
  { label: "Ajustes de notificaciones",icon: FaCog },
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

