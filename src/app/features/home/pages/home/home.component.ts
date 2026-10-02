import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../core/services/seo.service';
import { ContenuService } from '../../../../core/services/contenu.service';
import { DEFAUT_ACCUEIL } from '../../../../core/config/contenus';
import { PropertyService } from '../../../../core/services/property.service';
import { LABELS_AVANCEMENT, LABELS_CATEGORIE, LABELS_TYPE, Property, Quartier, imageBien } from '../../../../core/models/property.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  slideActif = 0;
  private timer: any;
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);
  private propertyService = inject(PropertyService);
  private contenus = inject(ContenuService);

  // Textes et images de la page, modifiables depuis l'admin
  c = DEFAUT_ACCUEIL;

  biensVedette: Property[] = [];
  labelsType = LABELS_TYPE;
  labelsCategorie = LABELS_CATEGORIE;
  labelsAvancement = LABELS_AVANCEMENT;
  imageBien = imageBien;

  ngOnInit() {
    this.contenus.lire('accueil', DEFAUT_ACCUEIL).subscribe((c) => (this.c = c));

    this.seo.definir({
      titre: 'Accueil',
      description: 'SCI-AGD : un domaine familial de 124 hectares à Songon Agban. 20 hectares mobilisés pour un programme résidentiel de plus de 400 logements, à vendre et à louer.',
    });

    // Les 3 derniers biens disponibles ; la section reste masquée en cas d'erreur ou de liste vide
    this.propertyService.getAll({ status: 'DISPONIBLE' }).subscribe({
      next: (biens) => (this.biensVedette = biens.slice(0, 3)),
      error: () => (this.biensVedette = []),
    });

    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => {
        this.slideActif = (this.slideActif + 1) % Math.max(this.c.slides.length, 1);
      }, 5000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  allerSlide(index: number) {
    this.slideActif = index;
  }

  labelQuartier(q: Quartier): string {
    return { QUARTIER_1: 'SOBE 1', QUARTIER_2: 'SOBE 2', QUARTIER_3: 'SOBE 3' }[q] ?? q;
  }

  formatPrix(prix: number): string {
    return new Intl.NumberFormat('fr-FR').format(prix);
  }
}
