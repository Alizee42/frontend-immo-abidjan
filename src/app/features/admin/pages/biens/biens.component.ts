import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../../../core/services/property.service';
import { LABELS_AVANCEMENT, LABELS_CATEGORIE, LABELS_TYPE, Property, PropertyStatus, Quartier } from '../../../../core/models/property.model';

@Component({
  selector: 'app-admin-biens',
  imports: [CommonModule, RouterLink],
  templateUrl: './biens.component.html',
  styleUrl: './biens.component.scss'
})
export class BiensComponent implements OnInit {
  private service = inject(PropertyService);

  biens: Property[] = [];
  chargement = true;
  erreur = false;
  suppressionEnCours: number | null = null;

  labelsType = LABELS_TYPE;
  labelsCategorie = LABELS_CATEGORIE;
  labelsAvancement = LABELS_AVANCEMENT;

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.chargement = true;
    this.erreur = false;
    this.service.getAll().subscribe({
      next: (data) => {
        this.biens = data;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  supprimer(bien: Property) {
    if (!confirm(`Supprimer « ${bien.titre} » ? Cette action est irréversible.`)) return;

    this.suppressionEnCours = bien.id;
    this.service.supprimer(bien.id).subscribe({
      next: () => {
        this.biens = this.biens.filter((b) => b.id !== bien.id);
        this.suppressionEnCours = null;
      },
      error: () => {
        this.suppressionEnCours = null;
        alert('La suppression a échoué. Réessayez.');
      },
    });
  }

  labelQuartier(q: Quartier): string {
    const map: Record<Quartier, string> = {
      QUARTIER_1: 'SOBE 1',
      QUARTIER_2: 'SOBE 2',
      QUARTIER_3: 'SOBE 3',
    };
    return map[q] ?? q;
  }

  labelStatus(s: PropertyStatus): string {
    const map: Record<PropertyStatus, string> = {
      DISPONIBLE: 'Disponible',
      RESERVE: 'Réservé',
      VENDU: 'Vendu',
      LOUE: 'Loué',
    };
    return map[s] ?? s;
  }

  pillStatus(s: PropertyStatus): string {
    if (s === 'DISPONIBLE') return 'pill--vert';
    if (s === 'RESERVE') return 'pill--or';
    return 'pill--gris';
  }

  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR').format(prix);
  }
}
