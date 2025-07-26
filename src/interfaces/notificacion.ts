export interface TipoNotificacion {
  cod_tipo_notificaciones: number;
  nombre: string;
  description: string;
}

export interface TipoNotificacionResponse {
  success: boolean;
  message: string;
  data: TipoNotificacion[];
}


export interface PreferenciaNotificacion {
  cod_usua_tip_notif: number;
  cod_usuario: string;
  cod_tipo_notificaciones: number;
  activo: boolean;
  TipoNotificacione?: {
    nombre: string;
  };
}

export interface PreferenciasResponse {
  success: boolean;
  message: string;
  data: PreferenciaNotificacion[];
}
