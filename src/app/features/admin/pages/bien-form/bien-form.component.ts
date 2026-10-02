import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../../core/services/property.service';
import { UploadService } from '../../../../core/services/upload.service';
import { Avancement, Categorie, PropertyType } from '../../../../core/models/property.model';

@Component({
  selector: 'app-bien-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './bien-form.component.html',
  styleUrl: './bien-form.component.scss'
})
export class BienFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(PropertyService);
  private uploadService = inject(UploadService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  bienId: number | null = null;
  chargement = false;
  enregistrement = false;
  erreur = '';

  photos: string[] = [];
  uploadEnCours = false;
  erreurUpload = '';

  form = this.fb.group({
    titre: ['', Validators.required],
    description: [''],
    type: ['VENTE', Validators.required],
    status: ['DISPONIBLE', Validators.required],
    categorie: ['MAISON_CLES_EN_MAIN', Validators.required],
    avancement: ['LIVRE', Validators.required],
    quartier: ['QUARTIER_1', Validators.required],
    superficie: [null as number | null],
    prix: [null as number | null, [Validators.required, Validators.min(1)]],
    nombreChambres: [null as number | null],
    nombreSallesDeBain: [null as number | null],
  });

  get estTerrain(): boolean {
    return this.form.value.categorie === 'TERRAIN_VIABILISE';
  }

  get labelPrix(): string {
    if (this.form.value.type === 'LOCATION') return 'Loyer mensuel (FCFA)';
    if (this.form.value.type === 'LOCATION_VENTE') return 'Mensualité (FCFA)';
    return 'Prix (FCFA)';
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.bienId = Number(idParam);
      this.chargement = true;
      this.service.getById(this.bienId).subscribe({
        next: (bien) => {
          this.form.patchValue(bien);
          this.photos = bien.photos ?? [];
          this.chargement = false;
        },
        error: () => {
          this.erreur = 'Impossible de charger ce bien.';
          this.chargement = false;
        },
      });
    }
  }

  onFichiersChoisis(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const fichiers = Array.from(input.files);
    this.uploadEnCours = true;
    this.erreurUpload = '';

    this.uploadService.uploaderPhotos(fichiers).subscribe({
      next: ({ urls }) => {
        this.photos = [...this.photos, ...urls];
        this.uploadEnCours = false;
        input.value = '';
      },
      error: () => {
        this.erreurUpload = "L'envoi des photos a échoué. Réessayez.";
        this.uploadEnCours = false;
        input.value = '';
      },
    });
  }

  retirerPhoto(index: number) {
    this.photos = this.photos.filter((_, i) => i !== index);
  }

  soumettre() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enregistrement = true;
    this.erreur = '';

    const valeurs = this.form.value;
    const bien = {
      titre: valeurs.titre!,
      description: valeurs.description ?? '',
      type: valeurs.type as PropertyType,
      status: valeurs.status as any,
      categorie: valeurs.categorie as Categorie,
      avancement: valeurs.avancement as Avancement,
      quartier: valeurs.quartier as any,
      superficie: valeurs.superficie ?? undefined,
      prix: valeurs.prix!,
      // Un terrain n'a ni chambres ni salles de bain : null efface les valeurs existantes
      nombreChambres: this.estTerrain ? null : valeurs.nombreChambres ?? null,
      nombreSallesDeBain: this.estTerrain ? null : valeurs.nombreSallesDeBain ?? null,
      photos: this.photos,
    };

    const requete = this.bienId
      ? this.service.modifier(this.bienId, bien)
      : this.service.creer(bien as any);

    requete.subscribe({
      next: () => this.router.navigate(['/admin/biens']),
      error: () => {
        this.enregistrement = false;
        this.erreur = "L'enregistrement a échoué. Vérifiez les champs et réessayez.";
      },
    });
  }
}
