import type { IconType } from "react-icons";

export interface QuickAccessItem {
  label: string;
  icon?: IconType;
}

export interface MenuColumn {
  title: string;
  items: string[];
}

export interface TabItem {
  title: string;
  columns: MenuColumn[];
}

export interface MenuItem {
  label: string;
  hasSubmenu?: boolean;
  megaMenu?: boolean;
  columns?: MenuColumn[];
  tabs?: TabItem[];
}

export interface UserActionsProps {
  menuOpen: boolean;
}