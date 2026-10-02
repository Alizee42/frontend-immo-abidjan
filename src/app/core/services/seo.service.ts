import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  titre: string;
  description: string;
}

const SITE_NOM = 'SCI-AGD';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  definir(data: SeoData) {
    const titrePage = `${data.titre} | ${SITE_NOM}`;
    this.title.setTitle(titrePage);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: titrePage });
    this.meta.updateTag({ property: 'og:description', content: data.description });
  }
}
