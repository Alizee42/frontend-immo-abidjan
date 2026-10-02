import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParametresService } from '../../core/services/parametres.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private parametres = inject(ParametresService);

  constructor() {
    this.parametres.charger();
  }

  get coordonnees() {
    return this.parametres.coordonnees();
  }
  annee = new Date().getFullYear();
}
