import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  chiffres = [
    { valeur: '400', unite: '', label: 'Résidences', detail: 'à vendre & à louer' },
    { valeur: '20', unite: 'ha', label: 'Surface totale', detail: 'au cœur d\'Abidjan' },
    { valeur: '3', unite: '', label: 'Quartiers', detail: 'espaces de vie distincts' },
    { valeur: '100', unite: '%', label: 'Sécurisé', detail: 'titre foncier enregistré' },
  ];

  atouts = [
    {
      icone: 'location',
      tag: 'Localisation',
      titre: 'Abidjan, capitale économique de l\'Afrique de l\'Ouest',
      texte: 'Ville à la croissance immobilière parmi les plus dynamiques du continent, Abidjan offre un marché porteur, une demande locative soutenue et une valorisation à long terme.',
      stat: '+7%', statLabel: 'croissance annuelle du marché'
    },
    {
      icone: 'home',
      tag: 'Qualité',
      titre: 'Des maisons conçues pour durer',
      texte: 'Matériaux sélectionnés, finitions soignées, espaces bien pensés — chaque résidence est construite selon des standards modernes pour garantir confort et durabilité au quotidien.',
      stat: '400', statLabel: 'résidences livrées clés en main'
    },
    {
      icone: 'shield',
      tag: 'Sécurité',
      titre: 'Votre investissement protégé',
      texte: 'Chaque bien dispose d\'un titre foncier officiel. Que vous soyez en France, au Canada ou ailleurs, notre équipe vous accompagne à chaque étape de façon transparente.',
      stat: '100%', statLabel: 'des biens titrés et enregistrés'
    },
  ];

  ngOnInit() {
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
