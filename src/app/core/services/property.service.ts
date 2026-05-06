import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property, PropertyFilter } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/properties';

  getAll(filters?: PropertyFilter): Observable<Property[]> {
    let params = new HttpParams();
    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.quartier) params = params.set('quartier', filters.quartier);
    if (filters?.status) params = params.set('status', filters.status);
    return this.http.get<Property[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }
}
