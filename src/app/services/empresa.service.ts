import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { Empresa } from '../models/empresa.enitity';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseService<Empresa> {
  constructor(protected override http: HttpClient) {
    super(http, API_ENDPOINTS.EMPRESAS);
  }

  protected override mapFromBackend(data: any): Empresa {
    return {
      idEmpresa: data.idempresa,
      nombreEmpresa: data.nombreempresa,
      ruc: data.ruc,
      fundacion: data.fundacion ? new Date(data.fundacion) : undefined,
      ultimaEvaluacion: data.ultimaevaluacion ? new Date(data.ultimaevaluacion) : undefined,
      numTrabajadores: data.numtrabajadores,
      isAdmisible: !data.isinadmisible,
      idCategoria: data.idcategoria,
      idHistorialCrediticio: data.idhistorialcrediticio
    };
  }

  protected override mapToBackend(empresa: Empresa): any {
    return {
      idEmpresa: empresa.idEmpresa,
      nombreEmpresa: empresa.nombreEmpresa,
      ruc: empresa.ruc,
      fundacion: empresa.fundacion instanceof Date ? empresa.fundacion.toISOString().split('T')[0] : empresa.fundacion,
      ultimaEvaluacion: empresa.ultimaEvaluacion instanceof Date ? empresa.ultimaEvaluacion.toISOString().split('T')[0] : empresa.ultimaEvaluacion,
      numTrabajadores: empresa.numTrabajadores,
      isInadmisible: !empresa.isAdmisible,
      idCategoria: empresa.idCategoria,
      idHistorialCrediticio: empresa.idHistorialCrediticio
    };
  }
} 