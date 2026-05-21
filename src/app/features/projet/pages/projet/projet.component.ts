import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projet',
  imports: [RouterLink, CommonModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss'
})
export class ProjetComponent {

  stats = [
    { valeur: '400', label: 'Résidences' },
    { valeur: '20 ha', label: 'Superficie totale' },
    { valeur: '3', label: 'Quartiers' },
    { valeur: '100%', label: 'Biens titrés' },
  ];

  quartiers = [
    {
      num: '01',
      nom: 'Quartier Résidentiel Nord',
      description: 'Un espace calme et verdoyant, idéal pour les familles cherchant un cadre de vie serein loin de l\'agitation urbaine.',
      couleur: '#2E8B57',
      features: ['Maisons 3 à 5 chambres', 'Jardins privatifs', 'Voies arborées', 'Aire de jeux'],
    },
    {
      num: '02',
      nom: 'Quartier Résidentiel Centre',
      description: 'Le cœur du domaine, alliant accessibilité, services de proximité et architecture moderne.',
      couleur: '#1A3C6E',
      features: ['Maisons 2 à 4 chambres', 'Commerces de proximité', 'Accès rapide aux axes principaux', 'Espaces communs'],
    },
    {
      num: '03',
      nom: 'Quartier Résidentiel Sud',
      description: 'Un secteur à fort potentiel locatif, prisé des investisseurs souhaitant générer des revenus.',
      couleur: '#B8860B',
      features: ['Studios et T2/T3', 'Forte demande locative', 'Proche des universités', 'Rendement optimisé'],
    },
  ];

  atouts = [
    {
      titre: 'Titre foncier sécurisé',
      texte: 'Chaque bien dispose d\'un titre foncier officiel enregistré. Votre investissement est protégé par les textes.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    },
    {
      titre: 'Architecture moderne',
      texte: 'Des plans pensés pour le confort, la ventilation naturelle et la durabilité à long terme.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    },
    {
      titre: 'Espaces verts intégrés',
      texte: 'Parcs, allées arborées et jardins partagés pour un environnement agréable au quotidien.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 10 9zM12 12c0-5 5-9 10-9-0 5-4 9-10 9z"/></svg>',
    },
    {
      titre: 'Accompagnement complet',
      texte: 'De la première visite à la signature, une équipe dédiée vous guide à chaque étape du processus.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    },
    {
      titre: 'Vente et location',
      texte: 'Que vous souhaitiez acheter pour habiter, louer ou investir, le programme propose les deux options.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    },
    {
      titre: 'Accessibilité internationale',
      texte: 'Démarches possibles à distance pour les acquéreurs de la diaspora africaine et internationale.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    },
  ];

  etapes = [
    { annee: '2023', titre: 'Acquisition du foncier', texte: 'Acquisition et sécurisation du domaine de 20 hectares. Enregistrement des titres fonciers.', actif: false },
    { annee: '2024', titre: 'Conception et plans', texte: 'Finalisation des plans d\'architecture, découpage en 3 quartiers, validation des normes de construction.', actif: false },
    { annee: '2025', titre: 'Lancement des constructions', texte: 'Début des travaux sur le Quartier Nord. Premières livraisons planifiées.', actif: true },
    { annee: '2026', titre: 'Commercialisation ouverte', texte: 'Ouverture à la vente et à la location sur l\'ensemble des 3 quartiers. Accompagnement des acquéreurs.', actif: false },
    { annee: '2027', titre: 'Livraisons finales', texte: 'Livraison de l\'ensemble des 400 résidences. Inauguration du domaine.', actif: false },
  ];
}
