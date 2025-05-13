export class Evaluacion {
  /** Identificador único de la evaluación */
  idEvaluacion?: number;
  /** Fecha de creación de la evaluación */
  fechaCreacion?: Date;
  /** Monto solicitado */
  montoSolicitado?: number;
  /** Sustento de la evaluación */
  sustento?: string;
  /** Estado de la evaluación */
  estadoEvaluacion?: string;
  /** Indica si tiene deudas */
  tieneDeudas?: boolean;
  /** Indica si tiene topes nacionales */
  topeNacional?: boolean;
  /** Indica si tiene casos legales abiertos */
  tieneCasosLegalesAbier?: boolean;
  /** Indica si tiene rating AQ más */
  ratingAqMas?: boolean;
  /** Empresa evaluada */
  idEmpresa?: number;
  /** Servicio asociado */
  idServicio?: number;
  /** Encargado que realizó la evaluación */
  idEncargado?: number;

  // Campos adicionales que vienen del backend en los joins
  /** Nombre de la empresa (de la relación con empresa) */
  nombreEmpresa?: string;
  /** Nombre del encargado (de la relación con encargado) */
  nombreEncargado?: string;
  /** Tipo de servicio (de la relación con servicio) */
  tipoServicio?: string;
}
