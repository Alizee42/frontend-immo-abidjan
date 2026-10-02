import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContenuService } from '../../../../core/services/contenu.service';
import { UploadService } from '../../../../core/services/upload.service';
import { Champ, DEFAUTS_PAGES, ETAPES_PROJET, PAGES_EDITABLES, PageEditable } from '../../../../core/config/contenus';

type Objet = Record<string, any>;

// Éditeur générique : le formulaire est construit à partir de PAGES_EDITABLES
@Component({
  selector: 'app-admin-page-editeur',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './page-editeur.component.html',
  styleUrl: './page-editeur.component.scss',
})
export class PageEditeurComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contenus = inject(ContenuService);
  private upload = inject(UploadService);

  page: PageEditable | null = null;
  valeur: Objet = {};
  chargement = true;
  enregistrement = false;
  message = '';
  erreur = '';
  modifie = false;
  sectionOuverte = 0;
  envoiEnCours: string | null = null;

  etapes = ETAPES_PROJET;

  ngOnInit() {
    const cle = this.route.snapshot.paramMap.get('cle');
    this.page = PAGES_EDITABLES.find((p) => p.cle === cle) ?? null;
    if (!this.page) {
      this.chargement = false;
      return;
    }
    const defauts = DEFAUTS_PAGES[this.page.cle] as Objet;
    this.contenus.lire(this.page.cle, defauts).subscribe((v) => {
      // Copie profonde : les valeurs par défaut ne doivent jamais être modifiées
      this.valeur = structuredClone(v);
      this.chargement = false;
    });
  }

  changer() {
    this.modifie = true;
    this.message = '';
  }

  // ===== Listes =====
  ajouter(liste: unknown[], champ: Champ) {
    liste.push(structuredClone(champ.nouveau ?? {}));
    this.changer();
  }

  ajouterTexte(liste: string[]) {
    liste.push('');
    this.changer();
  }

  retirer(liste: unknown[], index: number) {
    if (!confirm('Retirer cet élément ?')) return;
    liste.splice(index, 1);
    this.changer();
  }

  deplacer(liste: unknown[], index: number, sens: -1 | 1) {
    const cible = index + sens;
    if (cible < 0 || cible >= liste.length) return;
    [liste[index], liste[cible]] = [liste[cible], liste[index]];
    this.changer();
  }

  // Les champs d'un input bindé à un élément de liste de chaînes doivent être suivis par index
  suivreIndex(index: number) {
    return index;
  }

  // ===== Images =====
  envoyerImage(event: Event, objet: Objet | unknown[], cle: string | number, id: string) {
    const input = event.target as HTMLInputElement;
    const fichier = input.files?.[0];
    if (!fichier) return;
    this.envoiEnCours = id;
    this.upload.uploaderPhotos([fichier]).subscribe({
      next: ({ urls }) => {
        (objet as any)[cle] = urls[0];
        this.envoiEnCours = null;
        input.value = '';
        this.changer();
      },
      error: () => {
        this.envoiEnCours = null;
        input.value = '';
        alert("L'envoi de l'image a échoué. Formats acceptés : JPG, PNG ou WebP, 8 Mo maximum.");
      },
    });
  }

  ajouterImage(event: Event, liste: string[], id: string) {
    liste.push('');
    this.envoyerImage(event, liste, liste.length - 1, id);
  }

  // ===== Enregistrement =====
  enregistrer() {
    if (!this.page) return;
    this.enregistrement = true;
    this.erreur = '';
    this.contenus.enregistrer(this.page.cle, this.valeur).subscribe({
      next: () => {
        this.enregistrement = false;
        this.modifie = false;
        this.message = 'Modifications enregistrées. Elles sont déjà visibles sur le site.';
      },
      error: () => {
        this.enregistrement = false;
        this.erreur = "L'enregistrement a échoué. Réessayez.";
      },
    });
  }

  reinitialiser() {
    if (!this.page) return;
    if (!confirm('Remettre tous les textes et images de cette page par défaut ? Pensez ensuite à enregistrer.')) return;
    this.valeur = structuredClone(DEFAUTS_PAGES[this.page.cle] as Objet);
    this.changer();
  }
}
