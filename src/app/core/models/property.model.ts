export type PropertyType = 'VENTE' | 'LOCATION';
export type PropertyStatus = 'DISPONIBLE' | 'RESERVE' | 'VENDU' | 'LOUE';
export type Quartier = 'QUARTIER_1' | 'QUARTIER_2' | 'QUARTIER_3';

export interface Property {
  id: number;
  titre: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  quartier: Quartier;
  superficie: number;
  prix: number;
  nombreChambres: number;
  nombreSallesDeBain: number;
  photos: string[];
  createdAt: string;
}

export interface PropertyFilter {
  type?: PropertyType;
  quartier?: Quartier;
  status?: PropertyStatus;
  prixMin?: number;
  prixMax?: number;
}
