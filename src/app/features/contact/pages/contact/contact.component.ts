import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../../core/services/contact.service';
import { SeoService } from '../../../../core/services/seo.service';
import { PropertyService } from '../../../../core/services/property.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ParametresService } from '../../../../core/services/parametres.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private seo = inject(SeoService);
  private propertyService = inject(PropertyService);
  private route = inject(ActivatedRoute);

  // Bien concerné quand on arrive depuis une fiche (?bien=12)
  bienConcerne: { id: number; titre: string } | null = null;

  envoi: 'idle' | 'loading' | 'succes' | 'erreur' = 'idle';

  private parametres = inject(ParametresService);

  get coordonnees() {
    return this.parametres.coordonnees();
  }

  sujets = [
    { valeur: 'achat', label: 'Achat' },
    { valeur: 'location', label: 'Location' },
    { valeur: 'location-vente', label: 'Location-vente' },
    { valeur: 'investissement', label: 'Investissement' },
    { valeur: 'information', label: 'Information' },
    { valeur: 'autre', label: 'Autre' },
  ];

  pays = ["Côte d'Ivoire", 'France', 'Canada', 'Belgique', 'Suisse', 'États-Unis', 'Royaume-Uni', 'Allemagne', 'Italie', 'Espagne', 'Sénégal', 'Burkina Faso', 'Mali', 'Ghana'];

  get lienWhatsapp(): string {
    return 'https://wa.me/' + this.coordonnees.whatsapp.replace(/\D/g, '');
  }

  choisirSujet(valeur: string) {
    this.form.patchValue({ sujet: valeur });
    this.form.get('sujet')?.markAsTouched();
  }

  nouveauMessage() {
    this.envoi = 'idle';
  }

  ngOnInit() {
    this.parametres.charger();
    this.seo.definir({
      titre: 'Contact',
      description: 'Contactez l\'équipe SCI-AGD pour toute question sur les résidences, terrains et projets du domaine de Songon.',
    });

    const idBien = Number(this.route.snapshot.queryParamMap.get('bien'));
    if (idBien) {
      this.propertyService.getById(idBien).subscribe({
        next: (bien) => {
          this.bienConcerne = { id: bien.id, titre: bien.titre };
          const sujet = bien.type === 'VENTE' ? 'achat' : bien.type === 'LOCATION' ? 'location' : 'location-vente';
          this.form.patchValue({
            sujet,
            message: `Bonjour, je suis intéressé(e) par le bien « ${bien.titre} » (référence ${bien.id}). Pouvez-vous me donner plus d'informations ?`,
          });
        },
      });
    }
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
