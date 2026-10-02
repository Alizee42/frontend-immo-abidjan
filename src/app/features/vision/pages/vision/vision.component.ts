import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../core/services/seo.service';
import { PropertyService } from '../../../../core/services/property.service';
import { ContenuService } from '../../../../core/services/contenu.service';
import { DEFAUT_VISION, ETAPES_PROJET } from '../../../../core/config/contenus';

@Component({
  selector: 'app-vision',
  imports: [RouterLink, CommonModule],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss'
})
export class VisionComponent implements OnInit {
  private seo = inject(SeoService);
  private propertyService = inject(PropertyService);
  private contenus = inject(ContenuService);

  // Textes et images de la page, modifiables depuis l'admin
  c = DEFAUT_VISION;

  // Biens disponibles par quartier, calculés depuis l'API (null tant que non chargé)
  statsSobe: Record<string, { disponibles: number; terrains: number; maisons: number }> | null = null;

  ngOnInit() {
    this.contenus.lire('vision', DEFAUT_VISION).subscribe((c) => (this.c = c));

    this.seo.definir({
      titre: 'Vision',
      description: 'La vision foncière et immobilière de la SCI-AGD à Songon Agban : 124 hectares, un programme de 20 hectares porté par la mission Préserver, Construire, Loger.',
    });

    this.propertyService.getAll({ status: 'DISPONIBLE' }).subscribe({
      next: (biens) => {
        const stats: Record<string, { disponibles: number; terrains: number; maisons: number }> = {};
        for (const q of this.c.sobe) {
          const duQuartier = biens.filter((b) => b.quartier === q.quartier);
          stats[q.quartier] = {
            disponibles: duQuartier.length,
            terrains: duQuartier.filter((b) => b.categorie === 'TERRAIN_VIABILISE').length,
            maisons: duQuartier.filter((b) => b.categorie === 'MAISON_CLES_EN_MAIN').length,
          };
        }
        this.statsSobe = stats;
      },
      // Sans API, les compteurs restent simplement masqués
      error: () => (this.statsSobe = null),
    });
  }

  fonciers = [
    { valeur: '124 ha', label: 'Domaine total (ACD)' },
    { valeur: '20 ha', label: 'Programme immobilier actuel' },
    { valeur: '104 ha', label: 'Réserve foncière préservée' },
    { valeur: '3', label: 'Frères fondateurs' },
  ];

  // Proportions de la barre de répartition (surfaces en hectares)
  barreDomaine = [
    { nom: 'Programme immobilier', ha: 20, classe: 'programme' },
    { nom: 'Réserve foncière', ha: 104, classe: 'reserve' },
  ];

  barreProgramme = [
    { nom: 'SOBE 1, 2 et 3', ha: 12, classe: 'sobe' },
    { nom: 'Centre commercial', ha: 3, classe: 'commerce' },
    { nom: 'Hôtel', ha: 0.3, classe: 'hotel' },
    { nom: 'Non affecté', ha: 4.7, classe: 'libre' },
  ];

  repartition = [
    {
      nom: 'SOBE 1, 2 et 3',
      surface: '12 ha',
      classe: 'sobe',
      statut: 'neutre',
      statutLabel: 'Cœur résidentiel',
    },
    {
      nom: 'Centre commercial familial',
      surface: '3 ha',
      classe: 'commerce',
      statut: 'etude',
      statutLabel: 'Projet à l\'étude',
    },
    {
      nom: 'Projet hôtelier de Songon',
      surface: '3 000 m²',
      classe: 'hotel',
      statut: 'etude',
      statutLabel: 'Concept à préciser',
    },
    {
      nom: 'Réserve non affectée',
      surface: '4,7 ha',
      classe: 'libre',
      statut: 'reserve',
      statutLabel: 'Destination future non déterminée',
    },
  ];

  etapes = ETAPES_PROJET;

}
