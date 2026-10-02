import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../../../core/services/blog.service';
import { UploadService } from '../../../../core/services/upload.service';

@Component({
  selector: 'app-article-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(BlogService);
  private uploadService = inject(UploadService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  articleId: number | null = null;
  chargement = false;
  enregistrement = false;
  erreur = '';

  imageUrl = '';
  uploadEnCours = false;
  erreurUpload = '';

  form = this.fb.group({
    titre: ['', Validators.required],
    resume: ['', Validators.required],
    contenu: ['', Validators.required],
    auteur: [''],
    tagsTexte: [''],
    publie: [false],
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.articleId = Number(idParam);
      this.chargement = true;
      this.service.getById(this.articleId).subscribe({
        next: (article) => {
          this.form.patchValue({
            titre: article.titre,
            resume: article.resume,
            contenu: article.contenu,
            auteur: article.auteur,
            tagsTexte: (article.tags ?? []).join(', '),
            publie: article.publie,
          });
          this.imageUrl = article.imageUrl ?? '';
          this.chargement = false;
        },
        error: () => {
          this.erreur = 'Impossible de charger cet article.';
          this.chargement = false;
        },
      });
    }
  }

  onFichierChoisi(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.uploadEnCours = true;
    this.erreurUpload = '';

    this.uploadService.uploaderPhotos([input.files[0]]).subscribe({
      next: ({ urls }) => {
        this.imageUrl = urls[0];
        this.uploadEnCours = false;
        input.value = '';
      },
      error: () => {
        this.erreurUpload = "L'envoi de l'image a échoué. Réessayez.";
        this.uploadEnCours = false;
        input.value = '';
      },
    });
  }

  retirerImage() {
    this.imageUrl = '';
  }

  soumettre() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enregistrement = true;
    this.erreur = '';

    const valeurs = this.form.value;
    const tags = (valeurs.tagsTexte ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const article = {
      titre: valeurs.titre!,
      resume: valeurs.resume!,
      contenu: valeurs.contenu!,
      auteur: valeurs.auteur ?? '',
      imageUrl: this.imageUrl,
      tags,
      publie: !!valeurs.publie,
    };

    const requete = this.articleId
      ? this.service.modifier(this.articleId, article)
      : this.service.creer(article as any);

    requete.subscribe({
      next: () => this.router.navigate(['/admin/articles']),
      error: () => {
        this.enregistrement = false;
        this.erreur = "L'enregistrement a échoué. Vérifiez les champs et réessayez.";
      },
    });
  }
}
