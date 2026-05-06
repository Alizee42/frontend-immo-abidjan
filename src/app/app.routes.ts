import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'projet',
    loadComponent: () =>
      import('./features/projet/pages/projet/projet.component').then(m => m.ProjetComponent),
  },
  {
    path: 'acheter-louer',
    loadComponent: () =>
      import('./features/properties/pages/properties/properties.component').then(m => m.PropertiesComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/pages/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
