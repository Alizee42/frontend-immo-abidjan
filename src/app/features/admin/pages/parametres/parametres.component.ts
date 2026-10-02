import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContenuService } from '../../../../core/services/contenu.service';
import { ParametresService } from '../../../../core/services/parametres.service';
import { DemoService } from '../../../../core/services/demo.service';
import { COORDONNEES, Coordonnees } from '../../../../core/config/site.config';

@Component({
  selector: 'app-admin-parametres',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss',
})
export class ParametresComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contenus = inject(ContenuService);
  private parametres = inject(ParametresService);
  private demo = inject(DemoService);

  chargement = true;
  enregistrement = false;
  message = '';
  erreur = '';

  demoActive = false;
  purgeEnCours = false;
  messageDemo = '';

  form = this.fb.nonNullable.group({
    localisation: ['', Validators.required],
    email: ['', Validators.email],
    telephone: [''],
    whatsapp: [''],
  });

  ngOnInit() {
    this.contenus.lire('parametres', COORDONNEES).subscribe((c) => {
      this.form.setValue({ localisation: c.localisation, email: c.email, telephone: c.telephone, whatsapp: c.whatsapp });
      this.chargement = false;
    });
    this.demo.etat().subscribe({ next: ({ actif }) => (this.demoActive = actif), error: () => {} });
  }

  enregistrer() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.enregistrement = true;
    this.message = '';
    this.erreur = '';
    const valeur: Coordonnees = this.form.getRawValue();
    this.contenus.enregistrer('parametres', valeur).subscribe({
      next: () => {
        this.parametres.mettreAJour(valeur);
        this.enregistrement = false;
        this.message = 'Paramètres enregistrés. Ils sont déjà visibles sur le site.';
      },
      error: () => {
        this.enregistrement = false;
        this.erreur = "L'enregistrement a échoué. Réessayez.";
      },
    });
  }

  purgerDemo() {
    const ok = confirm(
      'Supprimer tout le contenu de démonstration (biens et articles fictifs) ?\n\nVos vrais biens et articles ne seront pas touchés. Cette action est irréversible.',
    );
    if (!ok) return;
    this.purgeEnCours = true;
    this.demo.purger().subscribe({
      next: ({ biens, articles }) => {
        this.purgeEnCours = false;
        this.demoActive = false;
        this.messageDemo = `Démonstration supprimée : ${biens} biens et ${articles} articles.`;
      },
      error: () => {
        this.purgeEnCours = false;
        this.messageDemo = 'La suppression a échoué. Réessayez.';
      },
    });
  }
}
