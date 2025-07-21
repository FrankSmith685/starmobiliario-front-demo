import { createContext } from "react";

export interface NotificationContextProps {
  messageType: "success" | "error" | "info" | null;
  apiMessage: string | null;
  showMessage: (message: string, type?: "success" | "error" | "info") => void;
  clearMessage: () => void;
}

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);
