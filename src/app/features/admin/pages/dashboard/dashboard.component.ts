import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PropertyService } from '../../../../core/services/property.service';
import { BlogService } from '../../../../core/services/blog.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Property } from '../../../../core/models/property.model';
import { Article } from '../../../../core/models/blog.model';

interface ActiviteItem {
  type: 'bien' | 'article';
  titre: string;
  date: string;
  lien: string[];
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private propertyService = inject(PropertyService);
  private blogService = inject(BlogService);
  auth = inject(AuthService);

  chargement = true;
  erreur = false;

  nbBiens = 0;
  nbBiensDisponibles = 0;
  nbArticles = 0;
  nbArticlesPublies = 0;
  nbArticlesBrouillon = 0;

  repartitionQuartiers: { label: string; valeur: number; pourcentage: number }[] = [];
  activiteRecente: ActiviteItem[] = [];

  ngOnInit() {
    forkJoin({
      biens: this.propertyService.getAll(),
      articles: this.blogService.getAllAdmin(),
    }).subscribe({
      next: ({ biens, articles }) => {
        this.calculerStats(biens, articles);
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  private calculerStats(biens: Property[], articles: Article[]) {
    this.nbBiens = biens.length;
    this.nbBiensDisponibles = biens.filter((b) => b.status === 'DISPONIBLE').length;
    this.nbArticles = articles.length;
    this.nbArticlesPublies = articles.filter((a) => a.publie).length;
    this.nbArticlesBrouillon = this.nbArticles - this.nbArticlesPublies;

    const labels: Record<string, string> = { QUARTIER_1: 'SOBE 1', QUARTIER_2: 'SOBE 2', QUARTIER_3: 'SOBE 3' };
    this.repartitionQuartiers = Object.entries(labels).map(([code, label]) => {
      const valeur = biens.filter((b) => b.quartier === code).length;
      return {
        label,
        valeur,
        pourcentage: this.nbBiens > 0 ? Math.round((valeur / this.nbBiens) * 100) : 0,
      };
    });

    const activitesBiens: ActiviteItem[] = biens.map((b) => ({
      type: 'bien',
      titre: b.titre,
      date: b.createdAt,
      lien: ['/admin/biens', String(b.id)],
    }));
    const activitesArticles: ActiviteItem[] = articles.map((a) => ({
      type: 'article',
      titre: a.titre,
      date: a.publishedAt,
      lien: ['/admin/articles', String(a.id)],
    }));

    this.activiteRecente = [...activitesBiens, ...activitesArticles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }
}
