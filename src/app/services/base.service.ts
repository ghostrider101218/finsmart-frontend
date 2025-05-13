import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable()
export abstract class BaseService<T> {
  constructor(
    protected http: HttpClient,
    protected apiUrl: string
  ) {}

  // Método para transformar datos del backend al modelo frontend
  protected mapFromBackend(data: any): T {
    return data as T;
  }

  // Método para transformar datos del modelo frontend al formato esperado por el backend
  protected mapToBackend(entity: T): any {
    return entity;
  }

  // GET - Listar todos
  getAll(): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<any[]>>(this.apiUrl).pipe(
      map(response => ({
        ...response,
        data: response.data.map(item => this.mapFromBackend(item))
      }))
    );
  }

  // GET - Búsqueda con parámetros
  search(params: Record<string, string | number | boolean>): Observable<ApiResponse<T[]>> {
    let httpParams = new HttpParams();
    
    // Convertir params a HttpParams
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, String(params[key]));
    });

    return this.http.get<ApiResponse<any[]>>(this.apiUrl, { params: httpParams }).pipe(
      map(response => ({
        ...response,
        data: response.data.map(item => this.mapFromBackend(item))
      }))
    );
  }

  // GET - Obtener por ID
  getById(id: number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        ...response,
        data: this.mapFromBackend(response.data)
      }))
    );
  }

  // POST - Crear nuevo
  create(entity: T): Observable<ApiResponse<T>> {
    const backendData = this.mapToBackend(entity);
    return this.http.post<ApiResponse<any>>(this.apiUrl, backendData).pipe(
      map(response => ({
        ...response,
        data: this.mapFromBackend(response.data)
      }))
    );
  }

  // PUT - Actualizar
  update(id: number, entity: T): Observable<ApiResponse<T>> {
    const backendData = this.mapToBackend(entity);
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, backendData).pipe(
      map(response => ({
        ...response,
        data: this.mapFromBackend(response.data)
      }))
    );
  }

  // DELETE - Eliminar
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
} 