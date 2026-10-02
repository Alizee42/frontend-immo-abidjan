import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-a-propos',
  imports: [RouterLink, CommonModule],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.definir({
      titre: 'À propos',
      description: 'La SCI-AGD, fondée par trois frères Atchan originaires de Songon Agban, porte une vision immobilière familiale : Préserver, Construire, Loger.',
    });
  }

  valeurs = [
    {
      titre: 'Préserver',
      texte: 'Sécuriser juridiquement le foncier familial et préserver la réserve non engagée dans les projets immobiliers.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    },
    {
      titre: 'Construire',
      texte: 'Développer un programme immobilier de qualité, pensé pour durer, sur le domaine de Songon Agban.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    },
    {
      titre: 'Loger',
      texte: 'Offrir des solutions de logement accessibles, à la vente comme à la location, pour les familles et les investisseurs.',
      svg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></svg>',
    },
  ];
}
