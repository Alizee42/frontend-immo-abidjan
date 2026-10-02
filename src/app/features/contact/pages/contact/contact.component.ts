import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../../core/services/contact.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private seo = inject(SeoService);

  envoi: 'idle' | 'loading' | 'succes' | 'erreur' = 'idle';

  ngOnInit() {
    this.seo.definir({
      titre: 'Contact',
      description: 'Contactez l\'équipe SCI-AGD pour toute question sur les résidences, terrains et projets du domaine de Songon.',
    });
  }

  form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: [''],
    paysResidence: ['', Validators.required],
    sujet: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  soumettre() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.envoi = 'loading';
    this.contactService.envoyer(this.form.value as any).subscribe({
      next: () => {
        this.envoi = 'succes';
        this.form.reset();
      },
      error: () => {
        this.envoi = 'erreur';
      }
    });
  }

  champ(nom: string) {
    return this.form.get(nom);
  }

  estInvalide(nom: string) {
    const c = this.champ(nom);
    return c?.invalid && c?.touched;
  }
}
