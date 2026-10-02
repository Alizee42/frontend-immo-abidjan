import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertyService } from '../../../../core/services/property.service';
import { SeoService } from '../../../../core/services/seo.service';
import {
  LABELS_AVANCEMENT,
  LABELS_CATEGORIE,
  LABELS_QUARTIER,
  LABELS_STATUS,
  LABELS_TYPE,
  Property,
  imageBien,
  imagesBien,
} from '../../../../core/models/property.model';

@Component({
  selector: 'app-bien-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './bien-detail.component.html',
  styleUrl: './bien-detail.component.scss',
})
export class BienDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(PropertyService);
  private seo = inject(SeoService);

  bien: Property | null = null;
  images: string[] = [];
  similaires: Property[] = [];
  chargement = true;
  introuvable = false;

  imageActive = 0;
  lightboxOuverte = false;

  labelsType = LABELS_TYPE;
  labelsCategorie = LABELS_CATEGORIE;
  labelsAvancement = LABELS_AVANCEMENT;
  labelsQuartier = LABELS_QUARTIER;
  labelsStatus = LABELS_STATUS;
  imageBien = imageBien;

  ngOnInit() {
    // Réagit aussi au passage d'une fiche à une autre via « Biens similaires »
    this.route.paramMap.subscribe((params) => this.charger(Number(params.get('id'))));
  }

  private charger(id: number) {
    this.chargement = true;
    this.introuvable = false;
    this.imageActive = 0;

    this.service.getById(id).subscribe({
      next: (bien) => {
        this.bien = bien;
        this.images = imagesBien(bien);
        this.chargement = false;
        this.seo.definir({
          titre: bien.titre,
          description: `${this.labelsCategorie[bien.categorie]} en ${this.labelsType[bien.type].toLowerCase()} à ${this.labelsQuartier[bien.quartier]}, domaine de Songon Agban. ${bien.description ?? ''}`.slice(0, 160),
        });
        this.chargerSimilaires(bien);
      },
      error: () => {
        this.introuvable = true;
        this.chargement = false;
      },
    });
  }

  private chargerSimilaires(bien: Property) {
    this.service.getAll({ quartier: bien.quartier }).subscribe({
      next: (biens) => {
        this.similaires = biens
          .filter((b) => b.id !== bien.id && (b.status === 'DISPONIBLE' || b.status === 'RESERVE'))
          .slice(0, 3);
      },
      error: () => (this.similaires = []),
    });
  }

  get estVenteOuLoue(): boolean {
    return this.bien?.status === 'VENDU' || this.bien?.status === 'LOUE';
  }

  get unitePrix(): string {
    return this.bien && this.bien.type !== 'VENTE' ? ' / mois' : '';
  }

  get libellePrix(): string {
    if (this.bien?.type === 'LOCATION') return 'Loyer mensuel';
    if (this.bien?.type === 'LOCATION_VENTE') return 'Mensualité';
    return 'Prix';
  }

  ouvrirLightbox(index: number) {
    this.imageActive = index;
    this.lightboxOuverte = true;
  }

  fermerLightbox() {
    this.lightboxOuverte = false;
  }

  precedente(event?: Event) {
    event?.stopPropagation();
    this.imageActive = (this.imageActive - 1 + this.images.length) % this.images.length;
  }

  suivante(event?: Event) {
    event?.stopPropagation();
    this.imageActive = (this.imageActive + 1) % this.images.length;
  }

  @HostListener('document:keydown', ['$event'])
  clavier(event: KeyboardEvent) {
    if (!this.lightboxOuverte) return;
    if (event.key === 'Escape') this.fermerLightbox();
    if (event.key === 'ArrowLeft') this.precedente();
    if (event.key === 'ArrowRight') this.suivante();
  }

  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR').format(prix);
  }
}
