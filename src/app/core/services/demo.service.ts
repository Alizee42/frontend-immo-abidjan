import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DemoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/demo`;

  etat(): Observable<{ actif: boolean }> {
    return this.http.get<{ actif: boolean }>(this.apiUrl);
  }

  purger(): Observable<{ biens: number; articles: number }> {
    return this.http.delete<{ biens: number; articles: number }>(this.apiUrl);
  }
}
