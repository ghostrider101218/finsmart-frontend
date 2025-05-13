export class HistorialLegal {
  /** Identificador único del historial legal */
  idHistorialLegal?: number;
  /** Tipo de proceso */
  tipoProceso?: string;
  /** Estado del proceso */
  estadoProceso?: string;
  /** Entidad estatal */
  entidadEstatal?: string;
  /** Fecha de inicio */
  fechaInicio?: Date;
  /** Fecha de fin */
  fechaFinal?: Date;
  /** Resultado del proceso */
  resultado?: string;
  /** Número de expediente */
  numExpediente?: string;
  /** Empresa asociada */
  idEmpresa?: number;
} 