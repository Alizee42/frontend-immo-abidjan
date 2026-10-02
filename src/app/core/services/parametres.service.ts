import { Injectable, inject, signal } from '@angular/core';
import { COORDONNEES, Coordonnees } from '../config/site.config';
import { ContenuService } from './contenu.service';

// Coordonnées du site partagées entre la page Contact, le pied de page et l'admin
@Injectable({ providedIn: 'root' })
export class ParametresService {
  private contenus = inject(ContenuService);

  readonly coordonnees = signal<Coordonnees>(COORDONNEES);
  private charge = false;

  charger() {
    if (this.charge) return;
    this.charge = true;
    this.contenus.lire('parametres', COORDONNEES).subscribe((c) => this.coordonnees.set(c));
  }

  mettreAJour(c: Coordonnees) {
    this.coordonnees.set(c);
  }
}
