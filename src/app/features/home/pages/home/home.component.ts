import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  slides = [
    { url: 'https://images.unsplash.com/photo-1599474462637-eeedfe72b12f?auto=format&fit=crop&w=1920&q=80' },
    { url: 'https://images.unsplash.com/photo-1718766304636-cb9309953a55?auto=format&fit=crop&w=1920&q=80' },
    { url: 'https://images.unsplash.com/photo-1529528070131-eda9f3e90919?auto=format&fit=crop&w=1920&q=80' },
  ];

  slideActif = 0;
  private timer: any;
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);

  chiffres = [
    { valeur: '124', unite: 'ha', label: 'Domaine de Songon', detail: 'couvert par un ACD' },
    { valeur: '20', unite: 'ha', label: 'Programme engagé', detail: 'SOBE, commerce, hôtel' },
    { valeur: '400', unite: '+', label: 'Logements', detail: 'sur les 3 quartiers SOBE' },
    { valeur: '3', unite: '', label: 'Frères fondateurs', detail: 'famille Atchan' },
  ];

  mission = [
    {
      lettre: 'P',
      titre: 'Préserver',
      texte: 'Sécuriser juridiquement le foncier familial. 104 des 124 hectares restent en réserve, volontairement non engagés dans le programme immobilier.',
    },
    {
      lettre: 'C',
      titre: 'Construire',
      texte: 'Développer un programme immobilier maîtrisé — les quartiers SOBE — sur les 20 hectares mobilisés, avec des maisons pensées pour durer.',
    },
    {
      lettre: 'L',
      titre: 'Loger',
      texte: 'Offrir des solutions accessibles à l\'achat comme à la location, pour les familles d\'Abidjan comme pour la diaspora.',
    },
  ];

  ngOnInit() {
    this.seo.definir({
      titre: 'Accueil',
      description: 'SCI-AGD : un domaine familial de 124 hectares à Songon Agban. 20 hectares mobilisés pour un programme résidentiel de plus de 400 logements, à vendre et à louer.',
    });

    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => {
        this.slideActif = (this.slideActif + 1) % this.slides.length;
      }, 5000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  allerSlide(index: number) {
    this.slideActif = index;
  }
}
