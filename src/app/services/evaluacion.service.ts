import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { Evaluacion } from '../models/evaluacion.enitity';
import { ApiResponse } from '../models/api-response.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService extends BaseService<Evaluacion> {
  constructor(protected override http: HttpClient) {
    super(http, API_ENDPOINTS.EVALUACIONES);
  }

  // Buscar evaluaciones por empresa
  getEvaluacionesPorEmpresa(idEmpresa: number): Observable<ApiResponse<Evaluacion[]>> {
    return this.search({ idempresa: idEmpresa });
  }

  // Buscar evaluaciones por estado
  getEvaluacionesPorEstado(estado: string): Observable<ApiResponse<Evaluacion[]>> {
    return this.search({ estadoevaluacion: estado });
  }

  // Buscar evaluaciones por monto mayor a
  getEvaluacionesPorMontoMayorA(monto: number): Observable<ApiResponse<Evaluacion[]>> {
    return this.search({ monto_minimo: monto });
  }

  // Cambiar estado de evaluación
  cambiarEstado(idEvaluacion: number, nuevoEstado: string): Observable<ApiResponse<Evaluacion>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${idEvaluacion}/estado`, { 
      estadoEvaluacion: nuevoEstado 
    });
  }

  protected override mapFromBackend(data: any): Evaluacion {
    // En GET, los datos vienen en minúsculas sin separador
    return {
      idEvaluacion: data.idevaluacion,
      fechaCreacion: data.fechacreacion ? new Date(data.fechacreacion) : undefined,
      montoSolicitado: data.montosolicitado,
      sustento: data.sustento,
      estadoEvaluacion: data.estadoevaluacion,
      tieneDeudas: data.tienedeudas,
      topeNacional: data.topmilnacional,
      tieneCasosLegalesAbier: data.tienecasoslegalesabiertos,
      ratingAqMas: data.ratingaomas,
      idEmpresa: data.idempresa,
      idServicio: data.idservicio,
      idEncargado: data.idencargado,
      // Campos adicionales que vienen del backend
      nombreEmpresa: data.nombreempresa,
      nombreEncargado: data.nombreencargado,
      tipoServicio: data.tiposervicio
    };
  }

  protected override mapToBackend(evaluacion: Evaluacion): any {
    // Para POST/PUT, los datos se envían en camelCase
    return {
      idEvaluacion: evaluacion.idEvaluacion,
      fechaCreacion: evaluacion.fechaCreacion instanceof Date 
        ? evaluacion.fechaCreacion.toISOString().split('T')[0] 
        : evaluacion.fechaCreacion,
      montoSolicitado: evaluacion.montoSolicitado,
      sustento: evaluacion.sustento,
      estadoEvaluacion: evaluacion.estadoEvaluacion,
      tieneDeudas: evaluacion.tieneDeudas,
      topeNacional: evaluacion.topeNacional,
      tieneCasosLegalesAbier: evaluacion.tieneCasosLegalesAbier,
      ratingAqMas: evaluacion.ratingAqMas,
      idEmpresa: evaluacion.idEmpresa,
      idServicio: evaluacion.idServicio,
      idEncargado: evaluacion.idEncargado
    };
  }
} 