export class Empresa {
  /** Identificador único de la empresa */
  idEmpresa?: number;
  /** Nombre de la empresa */
  nombreEmpresa?: string;
  /** RUC de la empresa */
  ruc?: string;
  /** Fecha de fundación */
  fundacion?: Date;
  /** Fecha de la última evaluación */
  ultimaEvaluacion?: Date;
  /** Número de trabajadores */
  numTrabajadores?: number;
  /** Indica si la empresa es admisible */
  isAdmisible?: boolean;
  /** Categoría de la empresa */
  idCategoria?: number;
  /** Historial crediticio asociado */
  idHistorialCrediticio?: number;
}
