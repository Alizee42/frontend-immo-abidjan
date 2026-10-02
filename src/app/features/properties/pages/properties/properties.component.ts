import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../../core/services/property.service';
import { Avancement, Categorie, LABELS_AVANCEMENT, LABELS_CATEGORIE, LABELS_TYPE, Property, PropertyType, PropertyStatus, Quartier, imageBien } from '../../../../core/models/property.model';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-properties',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit {
  private service = inject(PropertyService);
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  biens: Property[] = [];
  chargement = true;
  erreur = false;

  filtreType: PropertyType | '' = '';
  filtreQuartier: Quartier | '' = '';
  filtreStatus: PropertyStatus | '' = '';
  filtreCategorie: Categorie | '' = '';
  filtreAvancement: Avancement | '' = '';
  tri: 'recent' | 'prix_asc' | 'prix_desc' = 'recent';
  filtresOuverts = false;

  labelsType = LABELS_TYPE;
  labelsCategorie = LABELS_CATEGORIE;
  labelsAvancement = LABELS_AVANCEMENT;
  imageBien = imageBien;

  ngOnInit() {
    this.seo.definir({
      titre: 'Acheter ou louer',
      description: 'Terrains viabilisés et maisons clés en main à Songon Agban, en vente, location ou location-vente : filtrez par quartier SOBE, avancement et disponibilité.',
    });
    // Filtre de quartier transmis par un lien (ex. depuis la page Vision : ?quartier=QUARTIER_1)
    const quartier = this.route.snapshot.queryParamMap.get('quartier');
    if (quartier === 'QUARTIER_1' || quartier === 'QUARTIER_2' || quartier === 'QUARTIER_3') {
      this.filtreQuartier = quartier;
    }
    this.charger();
  }

  charger() {
    this.chargement = true;
    this.erreur = false;
    const filtres = {
      type: this.filtreType || undefined,
      quartier: this.filtreQuartier || undefined,
      status: this.filtreStatus || undefined,
      categorie: this.filtreCategorie || undefined,
      avancement: this.filtreAvancement || undefined,
      tri: this.tri,
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

  get nbFiltresActifs(): number {
    return [this.filtreType, this.filtreQuartier, this.filtreStatus, this.filtreCategorie, this.filtreAvancement].filter(Boolean).length;
  }

  reinitialiser() {
    this.filtreType = '';
    this.filtreQuartier = '';
    this.filtreStatus = '';
    this.filtreCategorie = '';
    this.filtreAvancement = '';
    this.charger();
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

  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR').format(prix);
  }
}
