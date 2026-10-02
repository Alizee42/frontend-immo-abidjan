import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/upload`;

  uploaderPhotos(fichiers: File[]): Observable<{ urls: string[] }> {
    const formData = new FormData();
    fichiers.forEach((f) => formData.append('photos', f));
    return this.http.post<{ urls: string[] }>(this.apiUrl, formData);
  }
}
