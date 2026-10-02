import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { Article } from '../../../../core/models/blog.model';

@Component({
  selector: 'app-admin-articles',
  imports: [CommonModule, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  private service = inject(BlogService);

  articles: Article[] = [];
  chargement = true;
  erreur = false;
  suppressionEnCours: number | null = null;

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.chargement = true;
    this.erreur = false;
    this.service.getAllAdmin().subscribe({
      next: (data) => {
        this.articles = data;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  supprimer(article: Article) {
    if (!confirm(`Supprimer « ${article.titre} » ? Cette action est irréversible.`)) return;

    this.suppressionEnCours = article.id;
    this.service.supprimer(article.id).subscribe({
      next: () => {
        this.articles = this.articles.filter((a) => a.id !== article.id);
        this.suppressionEnCours = null;
      },
      error: () => {
        this.suppressionEnCours = null;
        alert('La suppression a échoué. Réessayez.');
      },
    });
  }
}
