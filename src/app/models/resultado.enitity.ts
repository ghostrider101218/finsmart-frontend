export class Resultado {
  /** Identificador único del resultado */
  idResultado?: number;
  /** Indica si fue aprobado */
  isAprobado?: boolean;
  /** Fecha del resultado */
  fechaResultado?: Date;
  /** Evaluación asociada */
  idEvaluacion?: number;
  /** Línea de crédito asociada */
  idLineaDeCredito?: number;

  constructor(
    idResultado: number,
    isAprobado: boolean,
    fechaResultado: Date,
    idEvaluacion: number,
    idLineaDeCredito: number
  ) {
    this.idResultado = idResultado;
    this.isAprobado = isAprobado;
    this.fechaResultado = fechaResultado;
    this.idEvaluacion = idEvaluacion;
    this.idLineaDeCredito = idLineaDeCredito;
  }
}
