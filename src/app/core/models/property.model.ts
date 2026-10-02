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
  prixMin?: number;
  prixMax?: number;
}
