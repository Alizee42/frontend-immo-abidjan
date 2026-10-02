import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export type CleContenu = 'parametres' | 'accueil' | 'vision' | 'a-propos';

// Contenus modifiables depuis l'admin. Chaque page fusionne ce qui est enregistré
// avec ses valeurs par défaut : un champ jamais modifié garde son texte d'origine.
@Injectable({ providedIn: 'root' })
export class ContenuService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contenus`;

  lire<T extends object>(cle: CleContenu, defauts: T): Observable<T> {
    return this.http.get<Partial<T>>(`${this.apiUrl}/${cle}`).pipe(
      map((enregistre) => ({ ...defauts, ...enregistre })),
      catchError(() => of(defauts)),
    );
  }

  enregistrer<T extends object>(cle: CleContenu, valeur: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${cle}`, valeur);
  }
}
