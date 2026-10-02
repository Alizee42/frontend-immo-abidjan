import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AdminUtilisateur {
  id: number;
  email: string;
  nom: string;
}

interface LoginResponse {
  token: string;
  utilisateur: AdminUtilisateur;
}

const STORAGE_KEY = 'immoabidjan_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = `${environment.apiUrl}/auth`;

  utilisateur = signal<AdminUtilisateur | null>(null);

  connecter(email: string, motDePasse: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, motDePasse }).pipe(
      tap((res) => {
        this.stockerToken(res.token);
        this.utilisateur.set(res.utilisateur);
      })
    );
  }

  deconnecter() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.utilisateur.set(null);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  estConnecte(): boolean {
    return !!this.getToken();
  }

  private stockerToken(token: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(STORAGE_KEY, token);
    } catch {
      // stockage indisponible (navigation privée...), la session ne survivra pas au rechargement
    }
  }
}
