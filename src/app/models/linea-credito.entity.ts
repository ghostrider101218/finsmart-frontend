export class LineaDeCredito {
  /** Identificador único de la línea de crédito */
  idLineaDeCredito?: number;
  /** Monto solicitado */
  montoSolicitado?: number;
  /** Monto aprobado */
  montoAprobado?: number;
  /** Tasa de interés porcentual */
  tasaInteresPercen?: number;
  /** Fecha del primer pago */
  fechaPrimerPago?: Date;
  /** Fecha de expiración */
  fechaExpiracion?: Date;
} 