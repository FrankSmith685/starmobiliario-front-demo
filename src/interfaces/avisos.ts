import type { Operacion } from "./inmueble";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SubtipoInmueble {
  cod_subtipo_inmueble: number;
  nombre: string;
  cod_tipo_inmueble: number;
  tipo_inmueble_nombre:string;
}

export interface Aviso {
  cod_aviso: string;
  estado: string;
  cod_inmueble: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  titulo: string | null;
  precio: number | null;
  imagen: string | null;
  direccion: string | null;
  sub_tipo_propiedad: SubtipoInmueble[];
  tipo_operacion: Operacion[];
  calidad: string;
  calidad_score: number;
  porcentaje:number;
  desempeno:number;
  isArchivado:boolean;
}

export interface AvisosDTO{
    avisos: Aviso[];
    productos_disponibles: number;
    avisos_incompletos: number;
    avisos_duplicados: number;
    consultas_pendientes: number;
    reportes_pendientes: number;
    planes_activos: any[];
}

export interface AvisosResponse {
  success: boolean;
  message: string;
  data:AvisosDTO;
}
