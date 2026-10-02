export type PropertyType = 'VENTE' | 'LOCATION' | 'LOCATION_VENTE';
export type PropertyStatus = 'DISPONIBLE' | 'RESERVE' | 'VENDU' | 'LOUE';
export type Categorie = 'TERRAIN_VIABILISE' | 'MAISON_CLES_EN_MAIN';
export type Avancement = 'LIVRE' | 'EN_TRAVAUX' | 'PREVU';
export type Quartier = 'QUARTIER_1' | 'QUARTIER_2' | 'QUARTIER_3';

export const LABELS_TYPE: Record<PropertyType, string> = {
  VENTE: 'Vente',
  LOCATION: 'Location',
  LOCATION_VENTE: 'Location-vente',
};

export const LABELS_CATEGORIE: Record<Categorie, string> = {
  TERRAIN_VIABILISE: 'Terrain viabilisé',
  MAISON_CLES_EN_MAIN: 'Maison clés en main',
};

export const LABELS_AVANCEMENT: Record<Avancement, string> = {
  LIVRE: 'Livré',
  EN_TRAVAUX: 'En travaux',
  PREVU: 'Prévu',
};

export interface Property {
  id: number;
  titre: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  categorie: Categorie;
  avancement: Avancement;
  quartier: Quartier;
  superficie: number;
  prix: number;
  nombreChambres: number | null;
  nombreSallesDeBain: number | null;
  photos: string[];
  createdAt: string;
}

export interface PropertyFilter {
  type?: PropertyType;
  quartier?: Quartier;
  status?: PropertyStatus;
  categorie?: Categorie;
  avancement?: Avancement;
  tri?: 'recent' | 'prix_asc' | 'prix_desc';
  prixMin?: number;
  prixMax?: number;
}

// Image affichée pour un bien : sa première photo, sinon une image par défaut selon sa catégorie
export function imageBien(bien: Pick<Property, 'photos' | 'categorie'>): string {
  if (bien.photos?.length) return bien.photos[0];
  return bien.categorie === 'TERRAIN_VIABILISE' ? '/images/defaut/terrain.jpg' : '/images/defaut/maison.jpg';
}

export const LABELS_QUARTIER: Record<Quartier, string> = {
  QUARTIER_1: 'SOBE 1',
  QUARTIER_2: 'SOBE 2',
  QUARTIER_3: 'SOBE 3',
};

export const LABELS_STATUS: Record<PropertyStatus, string> = {
  DISPONIBLE: 'Disponible',
  RESERVE: 'Réservé',
  VENDU: 'Vendu',
  LOUE: 'Loué',
};

// Toutes les images d'un bien, avec l'image par défaut s'il n'a aucune photo
export function imagesBien(bien: Pick<Property, 'photos' | 'categorie'>): string[] {
  return bien.photos?.length ? bien.photos : [imageBien(bien)];
}
