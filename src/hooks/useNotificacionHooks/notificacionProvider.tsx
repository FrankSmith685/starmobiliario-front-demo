import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { NotificationContext } from "./notificacionContext";

interface Props {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const [messageType, setMessageType] = useState<"success" | "error" | "info" | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const showMessage = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    setApiMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setApiMessage(null);
      setMessageType(null);
    }, 4000);
  }, []);

  const clearMessage = () => {
    setApiMessage(null);
    setMessageType(null);
    };


  return (
    <NotificationContext.Provider value={{ messageType, apiMessage, showMessage, clearMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};
