import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-vision',
  imports: [RouterLink, CommonModule],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss'
})
export class VisionComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.definir({
      titre: 'Vision',
      description: 'La vision foncière et immobilière de la SCI-AGD à Songon Agban : 124 hectares, un programme de 20 hectares porté par la mission Préserver, Construire, Loger.',
    });
  }

  fonciers = [
    { valeur: '124 ha', label: 'Domaine total (ACD)' },
    { valeur: '20 ha', label: 'Programme immobilier actuel' },
    { valeur: '104 ha', label: 'Réserve foncière préservée' },
    { valeur: '3', label: 'Frères fondateurs' },
  ];

  repartition = [
    {
      nom: 'SOBE 1, 2 et 3',
      surface: '12 ha',
      statut: 'en-cours',
      statutLabel: 'Quartiers résidentiels',
      description: 'Trois quartiers résidentiels formant le cœur du programme, avec un potentiel global de plus de 400 logements.',
    },
    {
      nom: 'Centre commercial familial',
      surface: '3 ha',
      statut: 'etude',
      statutLabel: 'Projet à l\'étude',
      description: 'Un retail park de proximité pensé pour se développer progressivement : commerces, restauration, loisirs familiaux.',
    },
    {
      nom: 'Projet hôtelier de Songon',
      surface: '3 000 m²',
      statut: 'etude',
      statutLabel: 'Concept à préciser',
      description: 'Une emprise réservée pour un futur projet hôtelier. Positionnement, capacité et calendrier restent à définir.',
    },
    {
      nom: 'Réserve non affectée',
      surface: '4,7 ha',
      statut: 'reserve',
      statutLabel: 'Destination future non déterminée',
      description: 'Une part du programme volontairement non affectée, en attente d\'une orientation future.',
    },
  ];

  sobe = [
    {
      num: '01',
      nom: 'SOBE 1',
      description: 'Premier quartier résidentiel du programme, cœur historique du projet.',
      couleur: '#2E8B57',
      statut: 'Terrains viabilisés, maisons clés en main — vente, location et location-vente.',
    },
    {
      num: '02',
      nom: 'SOBE 2',
      description: 'Second quartier résidentiel, pensé en continuité avec SOBE 1.',
      couleur: '#1A3C6E',
      statut: 'Terrains viabilisés, maisons clés en main — vente, location et location-vente.',
    },
    {
      num: '03',
      nom: 'SOBE 3',
      description: 'Troisième quartier résidentiel du domaine.',
      couleur: '#B8860B',
      statut: 'Terrains viabilisés, maisons clés en main — vente, location et location-vente.',
    },
  ];

  atouts = [
    {
      titre: 'Foncier sécurisé juridiquement',
      texte: 'Le domaine de 124 hectares est couvert par un ACD. La réserve foncière est préservée et distincte du programme immobilier engagé.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    },
    {
      titre: 'Vision familiale',
      texte: 'La SCI-AGD est portée par trois frères originaires de Songon Agban, autour d\'une mission commune : Préserver, Construire, Loger.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    },
    {
      titre: 'Vente et location',
      texte: 'Que vous souhaitiez acheter pour habiter, louer ou investir, les quartiers SOBE proposent plusieurs formules.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    },
    {
      titre: 'Accessibilité internationale',
      texte: 'Démarches possibles à distance pour les acquéreurs de la diaspora africaine et internationale.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    },
  ];
}
