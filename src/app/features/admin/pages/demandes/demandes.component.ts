import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeService } from '../../../../core/services/demande.service';
import { Demande } from '../../../../core/models/demande.model';

const LABELS_SUJET: Record<string, string> = {
  achat: 'Achat',
  location: 'Location',
  'location-vente': 'Location-vente',
  investissement: 'Investissement',
  information: 'Information',
  autre: 'Autre',
};

type Filtre = 'a-traiter' | 'traitees' | 'toutes';

@Component({
  selector: 'app-admin-demandes',
  imports: [CommonModule],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.scss',
})
export class DemandesComponent implements OnInit {
  private service = inject(DemandeService);

  demandes: Demande[] = [];
  chargement = true;
  erreur = false;
  filtre: Filtre = 'a-traiter';
  ouverte: number | null = null;

  ngOnInit() {
    this.service.lister().subscribe({
      next: (d) => {
        this.demandes = d;
        this.chargement = false;
      },
      error: () => {
        this.erreur = true;
        this.chargement = false;
      },
    });
  }

  get visibles(): Demande[] {
    return this.filtrer(this.filtre);
  }

  compte(filtre: Filtre): number {
    return this.filtrer(filtre).length;
  }

  private filtrer(filtre: Filtre): Demande[] {
    if (filtre === 'a-traiter') return this.demandes.filter((d) => !d.traite);
    if (filtre === 'traitees') return this.demandes.filter((d) => d.traite);
    return this.demandes;
  }

  basculer(id: number) {
    this.ouverte = this.ouverte === id ? null : id;
  }

  labelSujet(sujet: string): string {
    return LABELS_SUJET[sujet] ?? sujet;
  }

  lienEmail(d: Demande): string {
    const objet = encodeURIComponent(`Votre demande — SCI-AGD (${this.labelSujet(d.sujet)})`);
    return `mailto:${d.email}?subject=${objet}`;
  }

  lienWhatsapp(d: Demande): string | null {
    const numero = d.telephone?.replace(/\D/g, '');
    return numero ? `https://wa.me/${numero}` : null;
  }

  marquer(d: Demande, traite: boolean) {
    this.service.marquer(d.id, traite).subscribe(() => {
      d.traite = traite;
      this.recompter();
    });
  }

  supprimer(d: Demande) {
    if (!confirm(`Supprimer la demande de ${d.prenom} ${d.nom} ? Cette action est irréversible.`)) return;
    this.service.supprimer(d.id).subscribe(() => {
      this.demandes = this.demandes.filter((x) => x.id !== d.id);
      this.recompter();
    });
  }

  // Met à jour le compteur du menu
  private recompter() {
    this.service.nonTraitees.set(this.demandes.filter((d) => !d.traite).length);
  }
}
