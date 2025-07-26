// Progreso de inmueble
export interface ProgressProperty {
  step: number; // Número del paso actual
  totalSteps: number; // Total de pasos
  currentPath: string; // Ruta actual del paso
}