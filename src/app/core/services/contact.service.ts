import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/contact';

  envoyer(demande: ContactRequest): Observable<string> {
    return this.http.post(this.apiUrl, demande, { responseType: 'text' });
  }
}
