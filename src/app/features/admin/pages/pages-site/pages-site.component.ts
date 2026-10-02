import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGES_EDITABLES } from '../../../../core/config/contenus';

@Component({
  selector: 'app-admin-pages-site',
  imports: [RouterLink],
  templateUrl: './pages-site.component.html',
  styleUrl: './pages-site.component.scss',
})
export class PagesSiteComponent {
  pages = PAGES_EDITABLES;
}
