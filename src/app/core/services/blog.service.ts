import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/blog.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/articles`;

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  getAllAdmin(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/admin`);
  }

  creer(article: Omit<Article, 'id' | 'publishedAt'>): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  modifier(id: number, article: Partial<Omit<Article, 'id' | 'publishedAt'>>): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
