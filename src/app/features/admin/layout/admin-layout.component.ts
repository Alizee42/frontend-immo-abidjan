import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DemandeService } from '../../../core/services/demande.service';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  auth = inject(AuthService);
  private demandes = inject(DemandeService);
  private router = inject(Router);

  menuOuvert = false;
  demandesNonTraitees = this.demandes.nonTraitees;

  get initiale(): string {
    return (this.auth.utilisateur()?.nom || 'A').charAt(0).toUpperCase();
  }

  ngOnInit() {
    this.demandes.lister().subscribe({ error: () => {} });
  }

  deconnecter() {
    this.auth.deconnecter();
    this.router.navigate(['/admin/connexion']);
  }
}
