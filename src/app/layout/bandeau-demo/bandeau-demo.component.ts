import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const CLE_MASQUE = 'bandeau-demo-masque';

// Étiquette affichée tant que le contenu de démonstration est chargé en base
@Component({
  selector: 'app-bandeau-demo',
  template: `
    @if (actif) {
      <div class="bandeau-demo" role="status">
        <span title="Les biens et articles présentés sont fictifs">Site de démonstration</span>
        <button type="button" (click)="masquer()" aria-label="Masquer">×</button>
      </div>
    }
  `,
  styles: `
    .bandeau-demo {
      position: fixed;
      left: 16px;
      bottom: 16px;
      z-index: 1100;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 6px 6px 14px;
      border-radius: 999px;
      background: #C9A876;
      color: #070D16;
      font-size: 0.78rem;
      font-weight: 600;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    }

    button {
      width: 22px;
      height: 22px;
      border: 0;
      border-radius: 50%;
      background: rgba(7, 13, 22, 0.12);
      color: #070D16;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
    }

    button:hover { background: rgba(7, 13, 22, 0.25); }
  `,
})
export class BandeauDemoComponent implements OnInit {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  actif = false;

  ngOnInit() {
    // Uniquement dans le navigateur : le pré-rendu ne doit pas figer l'état de l'étiquette
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      if (sessionStorage.getItem(CLE_MASQUE)) return;
    } catch {
      // Stockage indisponible : l'étiquette s'affiche simplement
    }
    this.http.get<{ actif: boolean }>(`${environment.apiUrl}/demo`).subscribe({
      next: ({ actif }) => (this.actif = actif),
      error: () => (this.actif = false),
    });
  }

  masquer() {
    this.actif = false;
    try {
      sessionStorage.setItem(CLE_MASQUE, '1');
    } catch {
      // Sans stockage, l'étiquette reviendra au prochain chargement
    }
  }
}
