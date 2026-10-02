import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../core/services/seo.service';
import { ContenuService } from '../../../../core/services/contenu.service';
import { DEFAUT_A_PROPOS } from '../../../../core/config/contenus';

@Component({
  selector: 'app-a-propos',
  imports: [RouterLink, CommonModule],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent implements OnInit {
  private seo = inject(SeoService);
  private contenus = inject(ContenuService);

  // Textes et images de la page, modifiables depuis l'admin
  c = DEFAUT_A_PROPOS;

  ngOnInit() {
    this.contenus.lire('a-propos', DEFAUT_A_PROPOS).subscribe((c) => (this.c = c));
    this.seo.definir({
      titre: 'À propos',
      description: 'La SCI-AGD, fondée par trois frères Atchan originaires de Songon Agban, porte une vision immobilière familiale : Préserver, Construire, Loger.',
    });
  }

}
