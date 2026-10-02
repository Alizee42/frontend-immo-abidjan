import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Demande } from '../models/demande.model';
import { environment } from '../../../environments/environment';

// Demandes reçues via le formulaire de contact (lecture et suivi depuis l'admin)
@Injectable({ providedIn: 'root' })
export class DemandeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contact`;

  // Compteur affiché dans le menu de l'admin
  readonly nonTraitees = signal(0);

  lister(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl).pipe(
      tap((demandes) => this.nonTraitees.set(demandes.filter((d) => !d.traite).length)),
    );
  }

  marquer(id: number, traite: boolean): Observable<Demande> {
    return this.http.patch<Demande>(`${this.apiUrl}/${id}`, { traite });
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
