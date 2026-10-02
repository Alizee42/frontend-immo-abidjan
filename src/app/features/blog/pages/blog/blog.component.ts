import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { Article } from '../../../../core/models/blog.model';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink, DatePipe, SlicePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  articles: Article[] = [];
  chargement = true;
  erreur = false;
  articleOuvert: Article | null = null;

  ngOnInit() {
    this.seo.definir({
      titre: 'Blog',
      description: 'Conseils immobiliers, tendances du marché d\'Abidjan et guides pour investir sereinement dans le programme de la SCI-AGD à Songon.',
    });
    this.blogService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      }
    });
  }

  lireArticle(article: Article) {
    this.articleOuvert = article;
    this.seo.definir({ titre: article.titre, description: article.resume });
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  fermerArticle() {
    this.articleOuvert = null;
    this.seo.definir({
      titre: 'Blog',
      description: 'Conseils immobiliers, tendances du marché d\'Abidjan et guides pour investir sereinement dans le programme de la SCI-AGD à Songon.',
    });
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}
