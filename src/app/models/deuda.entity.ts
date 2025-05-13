export class Deuda {
  /** Identificador único de la deuda */
  idDeuda?: number;
  /** Monto pactado */
  montoPactadoPe?: number;
  /** Monto pendiente */
  montoPendienteP?: number;
  /** Fecha de vencimiento */
  fechaVencimiento?: Date;
  /** Tasa de interés porcentual */
  tasaInteresPercen?: number;
  /** Días de mora */
  diasMora?: number;
  /** Empresa asociada */
  idEmpresa?: number;
} 