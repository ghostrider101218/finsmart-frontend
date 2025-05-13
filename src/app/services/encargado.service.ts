import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { Encargado } from '../models/encargado.enitity';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService extends BaseService<Encargado> {
  constructor(protected override http: HttpClient) {
    super(http, API_ENDPOINTS.ENCARGADOS);
  }

  protected override mapFromBackend(data: any): Encargado {
    return {
      idEncargado: data.idencargado,
      nombreEncargado: data.nombreencargado,
      dniEncargado: data.dniencargado,
      puesto: data.puesto
    };
  }

  protected override mapToBackend(encargado: Encargado): any {
    return {
      idEncargado: encargado.idEncargado,
      nombreEncargado: encargado.nombreEncargado,
      dniEncargado: encargado.dniEncargado,
      puesto: encargado.puesto
    };
  }
} 