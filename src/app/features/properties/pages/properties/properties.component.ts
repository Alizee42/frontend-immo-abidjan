import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../../core/services/property.service';
import { Property, PropertyType, PropertyStatus, Quartier } from '../../../../core/models/property.model';

@Component({
  selector: 'app-properties',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit {
  private service = inject(PropertyService);

  biens: Property[] = [];
  chargement = true;
  erreur = false;

  filtreType: PropertyType | '' = '';
  filtreQuartier: Quartier | '' = '';
  filtreStatus: PropertyStatus | '' = '';

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.chargement = true;
    this.erreur = false;
    const filtres = {
      type: this.filtreType || undefined,
      quartier: this.filtreQuartier || undefined,
      status: this.filtreStatus || undefined,
    };
    this.service.getAll(filtres).subscribe({
      next: (data) => {
        this.biens = data;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      }
    });
  }

  reinitialiser() {
    this.filtreType = '';
    this.filtreQuartier = '';
    this.filtreStatus = '';
    this.charger();
  }

  labelQuartier(q: Quartier): string {
    const map: Record<Quartier, string> = {
      QUARTIER_1: 'Quartier Nord',
      QUARTIER_2: 'Quartier Centre',
      QUARTIER_3: 'Quartier Sud',
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

  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR').format(prix);
  }
}
