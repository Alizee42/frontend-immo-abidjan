import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property, PropertyFilter } from '../models/property.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/properties`;

  getAll(filters?: PropertyFilter): Observable<Property[]> {
    let params = new HttpParams();
    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.quartier) params = params.set('quartier', filters.quartier);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.categorie) params = params.set('categorie', filters.categorie);
    if (filters?.avancement) params = params.set('avancement', filters.avancement);
    if (filters?.tri) params = params.set('tri', filters.tri);
    return this.http.get<Property[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  creer(bien: Omit<Property, 'id' | 'createdAt'>): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, bien);
  }

  modifier(id: number, bien: Partial<Omit<Property, 'id' | 'createdAt'>>): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, bien);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
