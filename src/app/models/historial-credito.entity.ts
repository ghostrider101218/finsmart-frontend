export class HistorialCredito {
  /** Identificador único del historial */
  idHistorial?: number;
  /** Fecha de inicio */
  fechaInicio?: Date;
  /** Fecha final */
  fechaFinal?: Date;
  /** Cuotas pagadas */
  cuotasPagadas?: number;
  /** Cuotas vencidas */
  cuotasVencidas?: number;
  /** Calificación crediticia */
  calificacionCredit?: string;
  /** Días de mora máxima */
  diasMoraMax?: number;
} 