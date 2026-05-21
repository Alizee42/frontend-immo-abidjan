import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { Article } from '../../../../core/models/blog.model';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink, DatePipe, SlicePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);

  articles: Article[] = [];
  chargement = true;
  erreur = false;
  articleOuvert: Article | null = null;

  ngOnInit() {
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
    document.body.style.overflow = 'hidden';
  }

  fermerArticle() {
    this.articleOuvert = null;
    document.body.style.overflow = '';
  }
}
