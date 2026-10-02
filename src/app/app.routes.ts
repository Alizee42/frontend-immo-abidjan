import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'acheter-louer',
    loadComponent: () =>
      import('./features/properties/pages/properties/properties.component').then(m => m.PropertiesComponent),
  },
  {
    path: 'acheter-louer/:id',
    loadComponent: () =>
      import('./features/properties/pages/bien-detail/bien-detail.component').then(m => m.BienDetailComponent),
  },
  {
    path: 'vision',
    loadComponent: () =>
      import('./features/vision/pages/vision/vision.component').then(m => m.VisionComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/pages/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'a-propos',
    loadComponent: () =>
      import('./features/a-propos/pages/a-propos/a-propos.component').then(m => m.AProposComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'projet',
    redirectTo: 'vision',
  },
  {
    path: 'admin/connexion',
    loadComponent: () =>
      import('./features/admin/pages/connexion/connexion.component').then(m => m.ConnexionComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/admin/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'biens',
        loadComponent: () =>
          import('./features/admin/pages/biens/biens.component').then(m => m.BiensComponent),
      },
      {
        path: 'biens/nouveau',
        loadComponent: () =>
          import('./features/admin/pages/bien-form/bien-form.component').then(m => m.BienFormComponent),
      },
      {
        path: 'biens/:id',
        loadComponent: () =>
          import('./features/admin/pages/bien-form/bien-form.component').then(m => m.BienFormComponent),
      },
      {
        path: 'demandes',
        loadComponent: () =>
          import('./features/admin/pages/demandes/demandes.component').then(m => m.DemandesComponent),
      },
      {
        path: 'parametres',
        loadComponent: () =>
          import('./features/admin/pages/parametres/parametres.component').then(m => m.ParametresComponent),
      },
      {
        path: 'pages',
        loadComponent: () =>
          import('./features/admin/pages/pages-site/pages-site.component').then(m => m.PagesSiteComponent),
      },
      {
        path: 'pages/:cle',
        loadComponent: () =>
          import('./features/admin/pages/page-editeur/page-editeur.component').then(m => m.PageEditeurComponent),
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./features/admin/pages/articles/articles.component').then(m => m.ArticlesComponent),
      },
      {
        path: 'articles/nouveau',
        loadComponent: () =>
          import('./features/admin/pages/article-form/article-form.component').then(m => m.ArticleFormComponent),
      },
      {
        path: 'articles/:id',
        loadComponent: () =>
          import('./features/admin/pages/article-form/article-form.component').then(m => m.ArticleFormComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
